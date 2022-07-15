"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Producto, Pedido, Direccion, Cesta
from api.utils import generate_sitemap, APIException
import json

api = Blueprint('api', __name__)

"""
This module takes care of JWT
"""
# create_access_token(), para crear JSON Web Tokens
# jwt_required(), para proteger rutas
# get_jwt_identity(), para obtener la identidad de JWT en una ruta protegida
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

"""
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
"""
#login
@api.route('/login', methods=['POST'])
def login():
    # almacenamos la solicitud JSON obtenida de email
    # almacenamos la solicitud JSON obtenida de password
    email = request.json.get("email", None) 
    password = request.json.get("password", None)
   

    # almacenamos la primera coincidencia de email en User
    user = User.query.filter_by(email=email).first()

    # condicion logica: 
    # si el email introducido no es coincidente con email de user
    # -O-
    # si el password introducido no es coincidente con password de user
    # retornamos mensaje y codigo de estado (error cliente)

    # if email != 'email' or password != 'password':
    #     # email != 'test' or password != 'test':
    #     return jsonify({"msg":"Bad username or password"}), 401

    if email != user.email or  current_app.bcrypt.check_password_hash(user.password,password) == False:
        return jsonify({"msg": "Bad username or password"}), 401
        
    access_token={
        "token": create_access_token(identity=email),
        "name": user.nombre
    }


    # almacenamos el token creado en la ruta protegida

    # access_token = create_access_token(identity=email)

    # retornamos el objeto Response devuelto por jsonify con la 
    # configuracion mimetype application/json 
    return jsonify(access_token=access_token)

# registration
@api.route('/registration')
def registration():
    # recibimos los datos del front
    body = json.loads(request.data)
    user_password = body["password"]

    # Hash password
    hashed_password = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8')
    print("pass", hashed_password)

    # Guardar nuevo user con hased_password
    user = User(nombre = body["nombre"], apellido=body["apellido"], email = body["email"], password = hashed_password, artista = body["artista"], dni = body["dni"], nacimiento = body["nacimiento"], foto_usuario = body["foto"], descripcion = body["descripcion"])
    #user = User(email=body["email"], password = hashed_password)
    db.session.add(user)
    db.session.commit()

    response_body={
        "message": "Formulario de Registro OK"
        
    }
    return jsonify(response_body), 200

# searchBar
@api.route('/artistas', methods=['POST', 'GET'])
def handle_artistas():
    response_body = User.query.order_by(User.nombre).all()
    response_body = [ user.serialize() for user in response_body]

    return json.dumps(response_body), 200

    

