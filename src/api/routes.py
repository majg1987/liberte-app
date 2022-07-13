"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException

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
    if email != 'email' or password != 'password':
        # email != 'test' or password != 'test':
        return jsonify({"msg":"Bad username or password"}), 401

    # almacenamos el token creado en la ruta protegida
    access_token = create_access_token(identity=email)

    # retornamos el objeto Response devuelto por jsonify con la 
    # configuracion mimetype application/json 
    return jsonify(access_token=access_token)

# registration
@api.route('/registration')
def registration():
    # recibimos los datos del front
    # json.loads(request.data)

    # Hash password
    #hashed_password = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8')

    # Guardar nuevo user con hased_password
    #user = User(email=body["email"], password = hashed_password)
    #db.session.add(user)
    #db.session.commit()

    response_body={
        "message": "Formulario de Registro OK"
        
    }
    return jsonify(response_body), 200



    

