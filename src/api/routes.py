"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)

# Allow CORS requests to this API



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
# @app.route('/form', methods=['POST'])
# def create_form():
#     try:
#         # Extraer datos del cuerpo de la solicitud
#         data = request.get_json()

#         # Crear la instancia de Form
#         new_form = Form(
#             initialDate=data['initialDate'],
#             finalDate=data['finalDate'],
#             userId=data['userId']
#         )
#         db.session.add(new_form)
#         db.session.commit()  # Necesario para generar el id del form antes de añadir los detalles

#         # Agregar los DetailForm
#         for detail in data.get('details', []):
#             new_detail = DetailForm(
#                 formId=new_form.id,
#                 stockId=detail['stockId'],
#                 description=detail['description'],
#                 quantity=detail['quantity'],
#                 type=StockTypeEnum(detail['type'])  # Usamos el Enum para asignar el tipo
#             )
#             db.session.add(new_detail)

#         # Confirmar la transacción para los DetailForm
#         db.session.commit()

#         # Devolver la respuesta con los datos del Form creado
#         return jsonify({
#             "message": "Form and details created successfully",
#             "form": new_form.serialize(),
#             "details": [detail.serialize() for detail in new_form.form_relationship]  # Devolver los detalles del form
#         }), 201
