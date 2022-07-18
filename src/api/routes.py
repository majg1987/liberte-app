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

# registration
@api.route('/registration', methods=['POST'])
def registration():
    # recibimos los datos del front
    body = json.loads(request.data)
    user_password = body["password"]

    # Hash password
    hashed_password = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8')
    print("pass", hashed_password)

    # Guardar nuevo user con hased_password
    user = User(nombre = body["nombre"], apellido=body["apellido"], email = body["email"], password = hashed_password, artista = body["artista"], nacimiento = body["nacimiento"], foto_usuario = body["foto_usuario"], descripcion = body["descripcion"])
    #user = User(email=body["email"], password = hashed_password)
    db.session.add(user)
    db.session.commit()
    print("ID",user.id)

    # users = User.query.all()
    # print("yeye",users)
    # db.session.query(Cesta).delete()
    # db.session.query(User).delete()
    # db.session.query(Producto).delete()
    # db.session.commit()


    response_body={
        "message": "Formulario de Registro OK"
        
    }
    return jsonify(response_body), 200




#login
@api.route('/login', methods=['POST'])
def login():
    # almacenamos la solicitud JSON obtenida de email
    # almacenamos la solicitud JSON obtenida de password
    email = request.json.get("email", None) 
    password = request.json.get("password", None)
   

    # almacenamos la primera coincidencia de email en User
    user = User.query.filter_by(email=email).first()

    # Si el email o password no coindicen retornamos error de autentificacion

    if email != user.email or  current_app.bcrypt.check_password_hash(user.password,password) == False:
        return jsonify({"msg": "Bad username or password"}), 401
        
    access_token={
        "token": create_access_token(identity=email),
        "name": user.nombre
    }

    # retornamos el objeto Response devuelto por jsonify con la 
    # configuracion mimetype application/json 
    return jsonify(access_token=access_token)



# Configuracion usuario
@api.route('/configuracion', methods=['PUT'])
def configuracion():

    body = json.loads(request.data)

    usuario_modificado = User.query.filter_by(id=body["id"]).first()
    user_keys = User.__table__.columns.keys()
   
    for edit_key in body:
        if body[edit_key] != None and  edit_key in user_keys:
            usuario_modificado_srlz = usuario_modificado.serialize()

            usuario_modificado_srlz[edit_key] = body[edit_key]

            usuario_modificado.nombre = usuario_modificado_srlz["nombre"]
            usuario_modificado.apellido = usuario_modificado_srlz["apellido"]
            usuario_modificado.email = usuario_modificado_srlz["email"]
            # usuario_modificado.password = usuario_modificado_srlz["password"]
            usuario_modificado.artista = usuario_modificado_srlz["artista"]
            usuario_modificado.nacimiento = usuario_modificado_srlz["nacimiento"]
            usuario_modificado.foto_usuario = usuario_modificado_srlz["foto_usuario"]
            usuario_modificado.descripcion = usuario_modificado_srlz["descripcion"]

            db.session.commit()

        response_body={
            "result": usuario_modificado_srlz
        }
            

    return response_body, 200



# Producto
@api.route('/producto', methods=['POST', 'GET', 'PUT'])
def handle_producto():

    # Publicar producto

    if request.method == 'POST':

        # DATOS RECIBIDOS = VALORES OBJETO

        body = json.loads(request.data)

        # Creamos nuevo producto
        nuevo_producto = Producto(nombre = body["nombre"], fecha_alta = body["fecha_alta"], categoria = body["categoria"], precio = body["precio"], vendido = body["vendido"], foto_producto = ["foto_producto"], descripcion= body["descripcion"], vendedor_user_id=body["vendedor_user_id"],  pedido_id = body["pedido_id"])
    
        # Guardamos producto
        db.session.add(nuevo_producto)
        db.session.commit()

        print("IDPRODUCT", nuevo_producto.id)
        
        response_body={
        "result": "Producto creado"  
    }
 
    
    # Obtener productos

    elif request.method == 'GET':

        # DATOS RECIBIDOS => ID USUARIO O NINGUNO
        # Comprobamos que la peticion nos envie datos para saber si devolver un producto o todos
        # En caso de que exista body asignamos su valor y el id del usuario
        if request.data != b'':
            body = json.loads(request.data) 
            id = body["id"]

        # Devolvemos todos los productos (vista de inicio) // Si no hay body
        get_lista_productos = Producto.query.order_by(Producto.id).all()
        lista_productos = [producto.serialize() for producto in get_lista_productos]
        response_body={
            "result": lista_productos
        }
        
        # Devolvemos los productos de un usuario (Vista usuario) // Si hay body
        if 'id' in locals() and id != None:
            
            # Buscamos en la tabla de producto el id del usuario
            get_productos_artista = Producto.query.filter_by(vendedor_user_id= body["id"]).all()
            productos_artista = [producto_artista.serialize() for producto_artista in get_productos_artista]

            # Devolvemos los productos del artista
            response_body={
                "result": productos_artista
            }


    # Modificar o eliminar productos

    elif request.method == 'PUT':

        # RECIBIMOS TODOS LOS DATOS DE LA TABLA DE PRODUCTO MÁS LA KEY "BORRAR"
        # * if borrar = true => Se borra el producto, else => Se edita

        body = json.loads(request.data)

        # Busco por producto ID
        producto_edit = Producto.query.filter_by(id = body["id"]).first()

        # Obtenemos las keys de la tabla producto para saber qué propiedad se ha cambiado
        keys = Producto.__table__.columns.keys()

        # Hacemos un bucle para saber los valores de las claves que han cambiado
        for edit_key in body:
            # Si el valor de la clave ha cambiado (es distinto a none) y las las claves del body coinciden con la del objeto Producto (borrar no entra) asignamos el nuevo valor
            if body[edit_key] != None and edit_key in keys:

                # Serializamos producto_edit para alterar sus valores (alteramos los valores que han cambiado, los que no se quedan igual)
                producto = producto_edit.serialize()
                producto[edit_key] = body[edit_key]

                # Incorporamos a nuestra clase los valores del producto serializado (los datos que no han cambiado permanecen y los que han cambiado se actualizan)
                producto_edit.nombre = producto['nombre']
                producto_edit.fecha_alta = producto['fecha_alta']
                producto_edit.categoria = producto['categoria']
                producto_edit.precio = producto['precio']
                producto_edit.vendido = producto['vendido']
                producto_edit.foto_producto = producto['foto_producto']
                producto_edit.descripcion = producto['descripcion']
                producto_edit.vendedor_user_id = producto['vendedor_user_id']
                producto_edit.pedido_id = producto['pedido_id']

                # Guardamos el producto modificado
                db.session.commit() 

                # Devolvemos el producto modificado
                response_body={
                     "result": producto
                }
        
        # BORRAR PRODUCTO

        if body["borrar"] == True:
            db.session.delete(producto_edit)
            db.session.commit()
            response_body={
                "msg": "Producto borrado"
            }




    return response_body, 200
    

@api.route('/direccion', methods=['POST', 'GET', 'PUT'])
def handle_direccion():


    # Publicamos direccion
    if request.method == 'POST':
        body = json.loads(request.data)
        nueva_direccion = Direccion(tipo_via= body["tipo_via"], nombre_via = body["nombre_via"], numero = body["numero"], piso = body["piso"],puerta = body["puerta"],user_id = body["user_id"] )
        # nuevo_producto = Producto(nombre = body["nombre"], fecha_alta = body["fecha_alta"], categoria = body["categoria"], precio = body["precio"], vendido = body["vendido"], foto_producto = ["foto_producto"], descripcion= body["descripcion"], vendedor_user_id=body["vendedor_user_id"],  pedido_id = body["pedido_id"])
    
        db.session.add(nueva_direccion)
        db.session.commit()
        print("nueva_direccion",nueva_direccion.id)
        
        response_body={
        "message": "Formulario de Registro OK"
        
    }
    
    elif request.method == 'GET':

        body = json.loads(request.data)
        id = body["id"]


        direccion_user = User.query.filter_by(id=id).first()


        direccion_completa = [ direcion.serialize() for direcion in direccion_user.direccion]
        print(direccion_completa[0]['puerta'])
        direccion_completa = direccion_completa[0]

        response_body={
            "message": f"la direccion es {direccion_user.direccion}, puerta: {direccion_completa['id']}"
        }

    return response_body, 200



@api.route('/cesta', methods=['POST', 'GET'])
def handle_cesta():

    if request.method == 'POST':
        body = json.loads(request.data)
        nueva_cesta = Cesta(user_id= body["user_id"], producto_id = body["producto_id"])
        # nuevo_producto = Producto(nombre = body["nombre"], fecha_alta = body["fecha_alta"], categoria = body["categoria"], precio = body["precio"], vendido = body["vendido"], foto_producto = ["foto_producto"], descripcion= body["descripcion"], vendedor_user_id=body["vendedor_user_id"],  pedido_id = body["pedido_id"])
    
        db.session.add(nueva_cesta)
        db.session.commit()
        print("cesta_id",nueva_cesta.id)
        
        response_body={
        "message": "Formulario de Registro OK"
        
    }
    
    else:
        print("adios")

    return response_body, 200



@api.route('/pedido', methods=['POST', 'GET'])
def handle_pedido():

    if request.method == 'POST':

        body = json.loads(request.data)

        # Añadimos nuevo pedido
        nuevo_pedido = Pedido(fecha_pedido = body["fecha_pedido"], historico = body["historico"], id_cesta = body["id_cesta"], id_direccion = body["id_direccion"], id_comprador= body["id_comprador"])
    
        db.session.add(nuevo_pedido)
        db.session.commit()

        # Buscamos en la cesta del pedido el id del producto comprado para alterar su valor de la colunna pedido
        cesta = Cesta.query.filter_by(id = body['id_cesta']).first()
        cesta = cesta.serialize()
        producto_id = cesta['producto_id']
        product_pedido = Producto.query.filter_by(id = producto_id).first()
        product_pedido.pedido_id = nuevo_pedido.id

        # Guardamos sesión con el registro del pedido en la tabla de producto
        db.session.commit()
        
        response_body={
        "message": "Formulario de Registro OK"    
    }
    
    else:
        body = json.loads(request.data)
        id = body["id"]

        
        pedido_user = User.query.filter_by(id=id).all()


        pedidos = [ pedido.serialize() for pedido in pedido_user]
        print(pedidos)
        # direccion_completa = direccion_completa[0]

        response_body={
            "message": f"la direccion es {direccion_user.direccion}, puerta: {direccion_completa['id']}"
        }


    return response_body, 200

    





# searchBar
@api.route('/artistas', methods=['POST', 'GET'])
def handle_artistas():
    response_body = User.query.order_by(User.nombre).all()
    response_body = [ user.serialize() for user in response_body]

    return json.dumps(response_body), 200

    