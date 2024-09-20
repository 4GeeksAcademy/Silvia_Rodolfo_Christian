"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, UserTypeEnum, Stock,StockTypeEnum,Form,DetailForm,UserUUID
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_mail import Mail, Message
import uuid
from flask_cors import CORS
from flask_jwt_extended import create_access_token #Importamos las librerias necesarias.
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import JWTManager
from datetime import timedelta #Importamos "timedelta" de datetime para modificar el tiempo de expiración de nuestro token.
from flask_bcrypt import Bcrypt

# from models import Person


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.config.update(dict(
    DEBUG = False,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD"),
    
    
))
mail = Mail(app)
app.url_map.strict_slashes = False


CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT-KEY") #Método para traer variables.
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
frontend_url = os.getenv("FRONTEND_URL")

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
     if ENV == "development":
         return generate_sitemap(app)
     return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/allforms', methods=['GET'])
#técnico puede ver todos los pedidos
def get_forms():
    try:
        all_forms = Form.query.allgit()  # Obtiene todos los registros de la tabla Form
        # Aplica el método to_dict() a cada objeto Form en la lista
        all_forms_serialize=[]
        for form in all_forms:
            all_forms_serialize.append(form.serialize())
        
        response_body = {
            "data": all_forms_serialize
        }
        return jsonify(response_body), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/register', methods=['POST'])
def register():
    body = request.get_json(silent=True)
    
    if body is None:
        return jsonify({'msg': 'Fields cannot be left empty'}), 400
    
    first_name = body.get('firstName')
    last_name = body.get('lastName')
    email = body.get('email')
    password = body.get('password')
    
    if not first_name:
        return jsonify({'msg': 'The firstName field cannot be empty'}), 400
    if not last_name:
        return jsonify({'msg': 'The lastName field cannot be empty'}), 400
    if not email:
        return jsonify({'msg': 'The email field cannot be empty'}), 400
    if not password:
        return jsonify({'msg': 'The password field cannot be empty'}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "The user already exists"}), 400

    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8') #Hasheamos la contraseña del usuario.
    
    new_user = User(
        firstName=first_name,
        lastName=last_name,
        email=email,
        password=pw_hash,
        isActive=True,
        userType=UserTypeEnum.usuario
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'New User Created'}), 201

@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    
    if body is None:
        return jsonify({'msg': 'Fields cannot be left empty'}), 400
    
    email = body.get('email')#.get() para acceder a una clave en un diccionario que no existe, devolverá None en lugar de lanzar una excepción.
    password = body.get('password')
    #Si lanza None el condicional no dejará que el campo esté vacío(buenas prácticas la combinación)
    if not email:
        return jsonify({'msg': 'The email field cannot be empty'}), 400
    if not password:
        return jsonify({'msg': 'The password field cannot be empty'}), 400

    user = User.query.filter_by(email=email).first() #Buscamos al usuario mediante su email:
    if user is None:
        return jsonify({'msg': 'User or password invalids'}), 400

    password_db = user.password #Recuperamos el hash de la contraseña del usuario desde la base de datos. Este hash es el que se generó cuando el usuario creó su cuenta.
    password_true = bcrypt.check_password_hash(password_db, password) #Compara la contraseña ingresada con el hash almacenado.
    if not password_true: #Si no coinciden la contraseña con el hash, retorna el mensaje:
        return jsonify({'msg': 'User or password invalids'}), 400

    expires = timedelta(hours=1) #Tiempo de expiración del token.
    access_token = create_access_token(identity=user.email, expires_delta=expires)#Creamos el token y usamos el email como identidad.
    return jsonify({'msg': 'ok', 'jwt_token': access_token}), 200

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()
        email = data.get('email')
        print(os.getenv("MAIL_USERNAME"))
        print(email)
        
        # Validar que el correo esté presente
        if not email:
            return jsonify({"msg": "Email is required"}), 400

        # Verificar si el correo está registrado en la base de datos
        user = User.query.filter_by(email=email).first()

        # Mensaje genérico, sin importar si el usuario fue encontrado o no
        if not user:
            return jsonify({"msg": "If the email is registered, a reset link has been sent."}), 200

        # Generar un UUID
        reset_uuid = str(uuid.uuid4())

        # Guardar el UUID en la base de datos
        new_uuid_entry = UserUUID(userId=user.id, uuid=reset_uuid)
        db.session.add(new_uuid_entry)
        db.session.commit()

        # Generar el enlace de restablecimiento de contraseña
        reset_link = f"{frontend_url}/reset-password/{reset_uuid}"

        # Enviar correo con el UUID
        msg = Message(
            subject="(No Reply), Mail para cambio contraseña",
            sender=os.getenv("MAIL_USERNAME"),
            recipients=[email]
        )
        # HTML content with a button
        msg.html = f"""
            <p>Click the button below to reset your password. The link will expire in 45 minutes.</p>
            <a href="{reset_link}" style="
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #fff;
                background-color: #4F9CF9;
                text-decoration: none;
                border-radius: 5px;
            ">Reset Password</a>
            <p>If you didn't request a password reset, you can ignore this email.</p>
        """
        mail.send(msg)

        # Mensaje genérico para evitar enumeración de correos
        return jsonify({"msg": "If the email is registered, a reset link has been sent."}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred. Please try again later."}), 500


@app.route('/reset-password/<uuid>', methods=['PUT'])
def reset_password(uuid):
    try:
        data = request.get_json()
        new_password = data.get('newPassword')

        # Verificar que se haya proporcionado la nueva contraseña
        if not new_password:
            return jsonify({"msg": "New password is required"}), 400

        # Buscar el UUID en la tabla UserUUID
        uuid_entry = UserUUID.query.filter_by(uuid=uuid).first()

        # Verificar si el UUID existe y no ha expirado
        if not uuid_entry or uuid_entry.is_expired():
            return jsonify({"msg": "Invalid or expired reset link"}), 400

        # Buscar al usuario asociado con este UUID
        user = User.query.get(uuid_entry.userId)

        if not user:
            return jsonify({"msg": "User not found"}), 404

        # Hashear la nueva contraseña con Flask-Bcrypt
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

        # Almacenar la nueva contraseña hasheada en la base de datos
        user.password = hashed_password
        db.session.commit()

        # Opcional: Borrar o invalidar el UUID tras el uso
        db.session.delete(uuid_entry)
        db.session.commit()

        return jsonify({"msg": "Password updated"}), 200

    except Exception as e:
        # Mantén solo los mensajes de error para no mostrar información sensible
        print(f"Error during password reset: {str(e)}")
        return jsonify({"error": "An internal error occurred. Please try again later."}), 500


def send_reset_email(email, reset_link):
    try:
        msg = Message(
            subject="Password Reset Request",
            sender=app.config.get("MAIL_USERNAME"),
            recipients=[email]
        )
        msg.body = f"Click the link to reset your password: {reset_link}"
        mail.send(msg)
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise e  # Esto debería lanzar una excepción si hay un error al enviar el correo

@app.route('/form', methods=['POST'])
def create_form():
       
         # Extraer datos del cuerpo de la solicitud
        body = request.get_json(silent=True)

        # Crear la instancia de Form
        new_form = Form(
             initialDate=body.get('initialDate'),
             finalDate=body.get('finalDate'),
             userId=body.get('userId')
         )
        db.session.add(new_form)
        db.session.commit()  # Necesario para generar el id del form antes de añadir los detalles

         # Agregar los DetailForm
        for detail in body.get('details', []):
             new_detail = DetailForm(
                 formId=new_form.id,
                 stockId=detail['stockId'],
                 description=detail['description'],
                 quantity=detail['quantity'],
                 type=StockTypeEnum(detail['type'])  # Usamos el Enum para asignar el tipo
            )
             db.session.add(new_detail)

         # Confirmar la transacción para los DetailForm
        db.session.commit()

         # Devolver la respuesta con los datos del Form creado
        return jsonify({
             "message": "Form and details created successfully",
             "form": new_form.serialize(),
             "details": [detail.serialize() for detail in new_form.form_relationship]  # Devolver los detalles del form
         }), 201


@app.route('/stock', methods=['GET'])
@jwt_required()
def get_stock():
   
    try:
        # Obtener parámetros de consulta
        stock_id = request.args.get('id')
        description = request.args.get('description')
        stock_type = request.args.get('type')

        # Construir la consulta con filtros opcionales
        query = Stock.query

        if stock_id:
            query = query.filter_by(id=stock_id)
        if description:
            query = query.filter(Stock.description.like(f'%{description}%'))  # Filtrado por descripción parcial
        if stock_type:
            query = query.filter_by(type=StockTypeEnum(stock_type))

        # Ejecutar la consulta
        stock_items = query.all()

        # Si no hay resultados
        if not stock_items:
            return jsonify({"message": "No items found"}), 404

        current_user = get_jwt_identity()
        print(current_user)
        # Devolver los resultados en formato JSON
        return jsonify([stock.serialize() for stock in stock_items]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/stock', methods=['POST'])
def create_stock():
   
    body = request.get_json(silent=True)
    
    description = body.get('description')
    quantity = body.get('quantity')
    stock_type = body.get('type')
    image = body.get('image')
    

@app.route('/stock/available', methods=['GET'])
def get_available_stock():
    try:
        # Filtrar los stocks que tengan quantity mayor a 0
        available_stock = Stock.query.filter(Stock.quantity > 0).all()

        # Si no hay resultados
        if not available_stock:
            return jsonify({"message": "No items found"}), 404

        # Devolver los resultados en formato JSON
        return jsonify([stock.serialize() for stock in available_stock]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400    



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

