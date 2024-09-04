import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Date
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
Base =declarative_base()
# db = SQLAlchemy()

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String(30), unique=True, nullable=False)
    nombre = Column(String(20), nullable=False)
    apellido = Column(String(20), nullable=False)
    password = Column(String(10), nullable=False)
    user_type= Column(String(10), nullable=False)
    is_active = Column(Boolean(), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre":self.nombre,
            "apellido":self.apellido,
            "password":self.password,
            "user_type":self.user_type,
            "is_active":self.is_active,
            # do not serialize the password, its a security breach
        }


class Form(Base):
    id = Column(Integer, primary_key=True)
    fecha = Column(Date(), nullable=False)
    userId = Column(Integer,ForeignKey('user.id') , nullable=False)
    user=relationship(User)
    def __repr__(self):
        return f'<Stock {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "fecha": self.fecha,
            "userId":self.userId,

            # do not serialize the password, its a security breach
        }
    
class Stock(Base):
    id = Column(Integer, primary_key=True)
    descripcion = Column(String(30), unique=True, nullable=False)
    cantidad = Column(Integer(4), nullable=False)
    def __repr__(self):
            return f'<Stock {self.id}>'

    def serialize(self):
            return {
                "id": self.id,
                "descripcion": self.descripcion,
                "cantidad":self.cantidad,
                # do not serialize the password, its a security breach
            }
    
class detalleForm(Base):
    id = Column(Integer, primary_key=True)
    formId = Column(Integer,ForeignKey('Form.id') , nullable=False)
    form=relationship(Form)
    stockId = Column(Integer,ForeignKey('Stock.id') , nullable=False)
    stock=relationship(Stock)
    descripcion = Column(String(30), unique=True, nullable=False)
    cantidad = Column(Integer(4), nullable=False)
    def __repr__(self):
            return f'<Stock {self.id}>'

    def serialize(self):
            return {
                "id": self.id,
                "descripcion": self.descripcion,
                "cantidad":self.cantidad,
                "formId":Form.id,
                "stockId":Stock.id
                # do not serialize the password, its a security breach
            }    