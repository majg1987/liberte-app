"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Producto, Pedido, Direccion, Cesta
from api.utils import generate_sitemap, APIException, check_user_id
import json

api = Blueprint("api", __name__)

"""
This module takes care of JWT
"""
# create_access_token(), para crear JSON Web Tokens
# jwt_required(), para proteger rutas
# get_jwt_identity(), para obtener la identidad de JWT en una ruta protegida
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


# registration
@api.route("/registration", methods=["POST"])
def registration():
    # recibimos los datos del front
    body = json.loads(request.data)

    # Hash password
    hashed_password = current_app.bcrypt.generate_password_hash(
        body["password"]
    ).decode("utf-8")

    # Guardar nuevo user con hashed_password
    body = {
        x: body[x]
        for x in [
            "nombre",
            "apellido",
            "email",
            "artista",
            "nacimiento",
            "foto_usuario",
            "descripcion",
        ]
    }

    body["password"] = hashed_password

    user = User(**body)

    db.session.add(user)
    db.session.commit()

    response_body = {"message": "Formulario de Registro OK"}
    return jsonify(response_body), 200


# login
@api.route("/login", methods=["POST"])
def login():
    # almacenamos la solicitud JSON obtenida de email y password
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # almacenamos la primera coincidencia de email en User
    user = User.query.filter_by(email=email).first()

    # Si el email o password no coindicen retornamos error de autentificacion

    if email != user.email or not current_app.bcrypt.check_password_hash(
        user.password, password
    ):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = {
        "token": create_access_token(identity=email),
        "user_info": {
            "user_id": user.id,
            "nombre": user.nombre,
            "apellido": user.apellido,
            "email": user.email,
            "artista": user.artista,
            "foto_usuario": user.foto_usuario,
            "apellido": user.apellido,
            "descripcion":user.descripcion
        },
    }

    # retornamos el objeto Response devuelto por jsonify con la
    # configuracion mimetype application/json
    return jsonify(access_token)


# Configuracion usuario
@api.route("/configuracion", methods=["PUT"])
@jwt_required()
def configuracion():

    user = get_jwt_identity()

    # Recibimos todos los datos del usuario menos contraseña
    body = json.loads(request.data)

    usuario_modificado = User.query.filter_by(id=body["id"]).first()
    direccion_usuario_modificado = Direccion.query.filter_by(user_id=body["id"]).first()
    user_keys = User.__table__.columns.keys()
    user_direccion_keys = Direccion.__table__.columns.keys()

    for edit_key in body:
        if body[edit_key] != None:

            usuario_modificado_srlz = usuario_modificado.serialize()
            # if direccion_usuario_modificado != None:
            # direcion_modificada_srl= direccion_usuario_modificado.serialize()

            if edit_key in user_keys:

                usuario_modificado_srlz[edit_key] = body[edit_key]
                usuario_modificado_srlz["user_id"] = usuario_modificado_srlz["id"]
                
                usuario_modificado.nombre = usuario_modificado_srlz["nombre"]
                usuario_modificado.apellido = usuario_modificado_srlz["apellido"]
                usuario_modificado.email = usuario_modificado_srlz["email"]
                usuario_modificado.artista = usuario_modificado_srlz["artista"]
                usuario_modificado.nacimiento = usuario_modificado_srlz["nacimiento"]
                usuario_modificado.foto_usuario = usuario_modificado_srlz["foto_usuario"]
                usuario_modificado.descripcion = usuario_modificado_srlz["descripcion"]
                           
                db.session.commit()

            # Cambiamos también su direccion
            if direccion_usuario_modificado != None and edit_key in user_direccion_keys:

                direcion_modificada_srl= direccion_usuario_modificado.serialize()

                direcion_modificada_srl[edit_key] = body[edit_key]

                direccion_usuario_modificado.tipo_via = direcion_modificada_srl["tipo_via"]
                direccion_usuario_modificado.nombre_via = direcion_modificada_srl["nombre_via"]
                direccion_usuario_modificado.numero = direcion_modificada_srl["numero"]
                direccion_usuario_modificado.piso = direcion_modificada_srl["piso"]
                direccion_usuario_modificado.puerta = direcion_modificada_srl["puerta"]
                
                db.session.commit()



        response_body = {"result": usuario_modificado_srlz}

    return response_body, 200


# GET Artista (perfil)
# Nos traemos la información del artista para su pagina de perfil

@api.route("/perfil_artista", methods=["POST", "GET"])
def handle_perfil_artista():
    user_id = request.args.get('user_id')
    # GET con user_id /api/perfil_artista?user_id=
    user_id, response_body = check_user_id(user_id)
    if len(response_body) != 0:
        return response_body, 400
    artista = User.query.filter_by(id=user_id).first()
    return json.dumps(artista.serialize()), 200

# GET Producto (perfil)
# Se hace este nuevo GET porque se modificó el GET /producto para que tuviera body (JSON)

@api.route("/perfil_galeria", methods=["POST", "GET"])
def handle_producto_galeria():
    # Recogemos argumento user_id de la URL. Si no existe, el GET es global
    user_id = request.args.get('user_id')
    # GET con user_id /api/producto?user_id=
    if user_id:
        user_id, response_body = check_user_id(user_id)
        if len(response_body) != 0:
            return response_body, 400
        # Este JSON es igual al que debería de retornar el endpoint con las fotos del usuario
        # Usamos data_gallery.py con datos dummy
        from api.data_gallery import data
        return json.dumps([x for x in data if x['user_id'] == user_id]), 200
        
        ##### NO BORRAR ####
        #response_body = Producto.query.filter_by(vendedor_user_id=user_id).all()
        #response_body = [producto.serialize() for producto in response_body]
        #return json.dumps(response_body), 200
        ##### NO BORRAR ####
    
    # GET sin user_id /api/producto_galeria
    else:
        response_body = Producto.query.filter_by(vendido=False).all()
        response_body = [producto.serialize() for producto in response_body]
        return json.dumps(response_body), 200


@api.route("/productosInicio", methods=["GET"])
def handle_productosInicio():
    # GET sin user_id /api/producto
    response_body = Producto.query.filter_by(vendido=False).all()
    response_body = [producto.serialize() for producto in response_body]
    for artista in response_body:
        user = User.query.filter_by(id=artista["vendedor_user_id"]).first()
        artista["vendedor_nombre"] = user.nombre
        artista["vendedor_foto"] = user.foto_usuario
    return json.dumps(response_body), 200

# Producto
@api.route("/producto", methods=["POST", "PUT"])
@jwt_required()
def handle_producto():
    # Ruta protegida
    user = get_jwt_identity()

    # Publicar producto
    if request.method == "POST":
        # DATOS RECIBIDOS = VALORES OBJETO
        body = json.loads(request.data)

        body = {
            x: body[x]
            for x in [
                "nombre",
                "categoria",
                "precio",
                "foto_producto",
                "dimensiones",
                "descripcion",
                "vendedor_user_id",
                "pedido_id",
            ]
        }


        # Creamos nuevo producto
        nuevo_producto = Producto(**body)
        nuevo_producto_fotoUser = User.query.filter_by(id=body["vendedor_user_id"]).first()
        nuevo_producto_srl = nuevo_producto.serialize()
        nuevo_producto_srl["user_foto"] = nuevo_producto_fotoUser.foto_usuario
        # Guardamos producto
        db.session.add(nuevo_producto)
        db.session.commit()
        # response_body = {"result": nuevo_producto.serialize()}
        response_body = {"result": nuevo_producto_srl}
        return json.dumps(response_body), 200

    # Modificar o eliminar productos
    elif request.method == "PUT":
        # RECIBIMOS el id de producto MÁS LA KEY "BORRAR" = true para borrar el producto
        # * if borrar = true => Se borra el producto, else => Se edita
        body = json.loads(request.data)
        # Busco por producto ID
        producto_edit = Producto.query.filter_by(id=body["id"]).first()
        # Obtenemos las keys de la tabla producto para saber qué propiedad se ha cambiado
        keys = Producto.__table__.columns.keys()
        # Hacemos un bucle para saber los valores de las claves que han cambiado
        for edit_key in body:
            # Si el valor de la clave ha cambiado (es distinto a none) y las las claves del body coinciden con la del objeto Producto (borrar no entra) asignamos el nuevo valor
            if body[edit_key] != None and edit_key in keys and edit_key != "id":
                # print(edit_key,"editkey")
                # Serializamos producto_edit para alterar sus valores (alteramos los valores que han cambiado, los que no se quedan igual)
                producto = producto_edit.serialize()
                producto[edit_key] = body[edit_key]

                # Incorporamos a nuestra clase los valores del producto serializado (los datos que no han cambiado permanecen y los que han cambiado se actualizan)
                producto_edit.nombre = producto["nombre"]
                producto_edit.fecha_alta = producto["fecha_alta"]
                producto_edit.categoria = producto["categoria"]
                producto_edit.precio = producto["precio"]
                producto_edit.vendido = producto["vendido"]
                producto_edit.foto_producto = producto["foto_producto"]
                producto_edit.dimensiones = producto["dimensiones"]
                producto_edit.descripcion = producto["descripcion"]
                # Guardamos el producto modificado
                db.session.commit()
                # Devolvemos el producto modificado
                response_body = {"result": producto}
        # BORRAR PRODUCTO
        if body["borrar"] == True:
            db.session.delete(producto_edit)
            db.session.commit()
            response_body = {"msg": "Producto borrado"}
    return response_body, 200

# Direccion
@api.route("/direccion", methods=["POST", "PUT"])
def handle_direccion():

    # Publicamos direccion
    if request.method == "POST":
        body = json.loads(request.data)


        nueva_direccion = Direccion(
            tipo_via=body["tipo_via"],
            nombre_via=body["nombre_via"],
            numero=body["numero"],
            piso=body["piso"],
            puerta=body["puerta"],
            user_id=body["user_id"],
        )

        db.session.add(nueva_direccion)
        db.session.commit()

        print("nueva_direccion", nueva_direccion.id)
        response_body = {"message": "Formulario de Registro OK"}

        # Para obtener direccion pasamos "get_direccion" + "user_id"
    elif request.method == "GET":
        direccion_user = User.query.filter_by(id=body["user_id"]).first()
        direccion_user = [
            direccion.serialize() for direccion in direccion_user.direccion
        ]
        response_body = {"result": direccion_user}

    elif request.method == "PUT":

        body = json.loads(request.data)

        direccion_modificada = Direccion.query.filter_by(
            user_id=body["user_id"]
        ).first()
        user_keys = Direccion.__table__.columns.keys()

        for edit_key in body:
            if body[edit_key] != None and edit_key in user_keys:
                direccion_modificada_srlz = direccion_modificada.serialize()

                direccion_modificada_srlz[edit_key] = body[edit_key]

                direccion_modificada.tipo_via = direccion_modificada_srlz["tipo_via"]
                direccion_modificada.nombre_via = direccion_modificada_srlz[
                    "nombre_via"
                ]
                direccion_modificada.numero = direccion_modificada_srlz["numero"]
                direccion_modificada.piso = direccion_modificada_srlz["piso"]
                direccion_modificada.puerta = direccion_modificada_srlz["puerta"]
                direccion_modificada.user_id = direccion_modificada_srlz["user_id"]

                db.session.commit()

            response_body = {"result": direccion_modificada_srlz}

    return response_body, 200


# Cesta
@api.route("/cesta", methods=["GET", "POST", "PUT"])
def handle_cesta():


    # Publicar cesta
    if request.method == "POST":

        # Recibimos todos los datos de Cesta
        body = json.loads(request.data)

        nueva_cesta = Cesta(
            user_id=body["user_id"], producto_id=body["producto_id"]
        )
        # Vemos si el registro de esa cesta esta ya hecho
        cesta_usuario = Cesta.query.filter_by(
            user_id=body["user_id"], producto_id=body["producto_id"]
        ).first()
        if cesta_usuario != None:
            response_body = {"msg": "Este producto ya está guardado en la cesta"}
        else:
            db.session.add(nueva_cesta)
            db.session.commit()
            response_body = {"result": nueva_cesta.serialize()}


    # Obtener cesta

    elif request.method == "GET":
        # Recibimos id_user
        # id_user = request.json.get("user_id", None)
        user_id = request.args.get('user_id')
        cesta_user = Cesta.query.filter_by(user_id=user_id).all()
        lista_productos_cesta = []
        # Metemos los productos serializados de la cesta en lista_productos_cesta
        for productos in cesta_user:
            producto = Producto.query.filter_by(id=productos.producto_id).first()
            lista_productos_cesta.append(producto.serialize())
        # Le incluimos el nombre del artista y su foto
        for artista in lista_productos_cesta:
            user = User.query.filter_by(id=artista["vendedor_user_id"]).first()
            artista["vendedor_nombre"] = user.nombre
            artista["vendedor_foto"] = user.foto_usuario
        response_body = {"result": lista_productos_cesta}
        return response_body, 200

    # Eliminar cesta
    elif request.method == "PUT":
        # Recibimos id_user e id_producto
        id_user = request.json.get("user_id", None)
        id_producto = request.json.get("producto_id", None)

        cesta_user = Cesta.query.filter_by(
            user_id=id_user, producto_id=id_producto
        ).first()

        db.session.delete(cesta_user)
        db.session.commit()

        response_body = {"resul": "Producto borrado de cesta"}

    return response_body, 200


# Pedido
@api.route("/pedido", methods=["GET", "POST"])
def handle_pedido():

    # Post para publicar y recibir. Incluimos en el body la variable petición.
    if request.method == "POST":

    # Recibimos todos los datos de pedido mas id_user
        body = json.loads(request.data)

        # Añadimos nuevo pedido
        nuevo_pedido = Pedido(
            historico=False, id_comprador=body["id_comprador"]
        )
        db.session.add(nuevo_pedido)
        db.session.commit()
        # Buscamos en la cesta del pedido el id del producto comprado para alterar su valor de la colunna pedido
        cesta_usuario = Cesta.query.filter_by(user_id=body["id_comprador"]).all()
        product_cesta = [producto.serialize() for producto in cesta_usuario]

        for product_id in product_cesta:

            product_pedido = Producto.query.filter_by(
                id=product_id["producto_id"]
            ).first()
            cestas_con_producto = Cesta.query.filter_by(
                producto_id=product_id["producto_id"]
            ).all()

            for cesta in cestas_con_producto:
                db.session.delete(cesta)
                print("cesta borrada")
    
            # Guardamos en la tabla de producto el id del pedido y lo marcamos como vendido

            product_pedido.pedido_id = nuevo_pedido.id
            product_pedido.vendido = True

            db.session.commit()
        
        response_body = {"message": "Formulario de Registro OK"}


    if request.method== "GET":

        # Recibimos id de cesta pedida
        user_id = request.args.get('user_id')

        # Obtenemos la lista de pedidos del usuario con historico = False
        pedido_user = Pedido.query.filter_by(id_comprador=user_id, historico=False).all()

        # Creamos el array que devolveremos con cada pedido y los productos adquiridos
        productos_info = []

        for pedido in pedido_user:
            pedido_srl = pedido.serialize()

            # Buscamos los productos seleccionados en ese pedido
            productos = Producto.query.filter_by(pedido_id=pedido_srl["id"]).all()

            # Incluimos en los pedidos los objetos adquiridos y los devolvemos
            pedido_srl["productos_info"] = [
                producto.serialize() for producto in productos
            ]
            productos_info.append(pedido_srl)

        response_body = {"result": productos_info}

    return response_body, 200


# searchBar
@api.route("/artistas", methods=["POST", "GET"])
def handle_artistas():
    response_body = User.query.filter_by(artista=True).order_by(User.nombre).all()
    response_body = [user.serialize() for user in response_body]

    return json.dumps(response_body), 200
