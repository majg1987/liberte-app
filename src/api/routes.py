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

    db.session.add(user)
    db.session.commit()


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

    # Recibimos todos los datos del usuario menos contraseña
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
        get_lista_productos = Producto.query.filter_by(pedido_id = None).all()
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
    

# Direccion
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
    
    elif request.method == 'PUT':

        body = json.loads(request.data)

        direccion_modificada = Direccion.query.filter_by(user_id=body["user_id"]).first()
        user_keys = Direccion.__table__.columns.keys()
    
        for edit_key in body:
            if body[edit_key] != None and  edit_key in user_keys:
                direccion_modificada_srlz = direccion_modificada.serialize()

                direccion_modificada_srlz[edit_key] = body[edit_key]

                direccion_modificada.tipo_via = direccion_modificada_srlz["tipo_via"]
                direccion_modificada.nombre_via = direccion_modificada_srlz["nombre_via"]
                direccion_modificada.numero = direccion_modificada_srlz["numero"]
                direccion_modificada.piso = direccion_modificada_srlz["piso"]
                direccion_modificada.puerta = direccion_modificada_srlz["puerta"]
                direccion_modificada.user_id = direccion_modificada_srlz["user_id"]


                db.session.commit()

            response_body={
                "result": direccion_modificada_srlz
            }

        
    return response_body, 200


# Cesta

@api.route('/cesta', methods=['POST', 'GET', 'PUT'])
def handle_cesta():

    # Publicar cesta
    if request.method == 'POST':
        # Recibimos todos los datos de Cesta
        body = json.loads(request.data)
        nueva_cesta = Cesta(user_id= body["user_id"], producto_id = body["producto_id"])
    
        # Vemos si el registro de esa cesta esta ya hecho
        cesta_usuario = Cesta.query.filter_by(user_id = body["user_id"], producto_id = body["producto_id"]).first()

        if cesta_usuario != None:
            response_body={
                "msg": "Este producto ya está guardado en la cesta"
            }

        else:
            db.session.add(nueva_cesta)
            db.session.commit()
            response_body={
                "result": nueva_cesta.serialize()   
            }

        
    # Obtener cesta
    
    if request.method == 'GET':
        # Recibimos id_user
        id_user = request.json.get("id_user", None)

        cesta_user = Cesta.query.filter_by(user_id=id_user).all()

        cesta_user_srlz = [cesta.serialize() for cesta in cesta_user]

        response_body ={
            "resul": cesta_user_srlz
        }

    
    # Eliminar cesta
    if request.method == 'PUT':
        # Recibimos id_user e id_producto
        id_user = request.json.get("id_user", None)
        id_producto = request.json.get("id_producto", None)

        cesta_user = Cesta.query.filter_by(user_id= id_user, producto_id = id_producto ).first()

        print(cesta_user)


        db.session.delete(cesta_user)
        db.session.commit()

        response_body ={
            "resul": "Producto borrado de cesta"
        }

    return response_body, 200


# Pedido

@api.route('/pedido', methods=['POST', 'GET'])
def handle_pedido():

    if request.method == 'POST':
        # Recibimos todos los datos de pedido mas id_user
        body = json.loads(request.data)

        # Añadimos nuevo pedido
        nuevo_pedido = Pedido(fecha_pedido = body["fecha_pedido"], historico = body["historico"], id_comprador = body["id_comprador"])
    
        db.session.add(nuevo_pedido)
        db.session.commit()



        # Buscamos en la cesta del pedido el id del producto comprado para alterar su valor de la colunna pedido
        cesta_usuario = Cesta.query.filter_by(user_id = body['id_comprador']).all()
        product_cesta = [producto.serialize() for producto in cesta_usuario]


        for product_id in product_cesta:


            product_pedido = Producto.query.filter_by(id = product_id["producto_id"]).first()
            cestas_con_producto = Cesta.query.filter_by(producto_id =  product_id["producto_id"]).all() 
            for cesta in cestas_con_producto:
                db.session.delete(cesta)
                print("cesta borrada")
            product_pedido.pedido_id = nuevo_pedido.id
            db.session.commit()

        
        response_body={
            "message": "Formulario de Registro OK"    
        }
    
    elif request.method == 'GET':

        # Recibimos id de cesta pedida
        body = json.loads(request.data)
        id = body["id"]

        # Obtenemos la lista de pedidos del usuario con historico = False
        pedido_user = Pedido.query.filter_by(id=id, historico = False).all()


        pedidos = [ pedido.serialize() for pedido in pedido_user]


        response_body={
            "message": pedidos
        }

    return response_body, 200

    

# searchBar
@api.route('/artistas', methods=['POST', 'GET'])
def handle_artistas():
    response_body = User.query.order_by(User.nombre).all()
    response_body = [ user.serialize() for user in response_body]

    return json.dumps(response_body), 200

    