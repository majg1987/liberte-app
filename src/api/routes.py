"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Producto, Pedido, Direccion, Cesta
from api.utils import generate_sitemap, APIException, check_user_id
import json, random, string, bcrypt
from flask_mail import Mail, Message


api = Blueprint("api", __name__)

"""
This module takes care of JWT
"""
# create_access_token(), para crear JSON Web Tokens
# jwt_required(), para proteger rutas
# get_jwt_identity(), para obtener la identidad de JWT en una ruta protegida
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

# restablecer contraseña por mail
@api.route("/recuperarPassword", methods=["POST"])
def recuperarPassword():
    # Recibimos los datos del front
    body = json.loads(request.data)
    email = body["email"]
    # Creamos password de forma aleatoria
    new_password = "".join(random.choice(string.ascii_uppercase + string.digits)for x in range(10))
    # Hash password
    hashed_password = current_app.bcrypt.generate_password_hash(new_password).decode("utf-8")
    # Almacenamos la info del user con el email recibido
    user = User.query.filter_by(email=email).first()
    # Asignamos el nuevo password generado aleatoriamente al usuario
    if user != None:
        user.password = hashed_password
        db.session.commit()

        mail = Mail() 
        msg = Message('Recuperación de Password', sender = 'liberte', recipients = [user.email])
        msg.body = "Hola " + user.nombre + " tu nuevo password es " + new_password + "."
        msg.html = "<h1>Libertè</h1><h2> Hola " + user.nombre + "</h2> <p> Tu nuevo password es <b> " + new_password + "</b></p><p>Si usted no ha solicitado el cambio de contraseña ignore y elimine el mensaje por favor.</p> <p> Mensaje enviado automáticamente, no responda</p>" 
        mail.send(msg)
        return "Message sent!"
    else:
        return jsonify({"msg":"El correo introducido no esta registrado"}), 400

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
    usuario = User.query.filter_by(email=body["email"]).first()

    direccion = Direccion(tipo_via="Avenida", nombre_via= "Andalucia", numero=2, piso=1, puerta="2A", user_id=usuario.id)
    db.session.add(direccion)
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

    if user is None:
        return jsonify({"msg": "User does not exist"}), 404
        
    # Si el email o password no coindicen retornamos error de autentificacion
    if email != user.email or not current_app.bcrypt.check_password_hash(
        user.password, password
    ):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = {
        "token": create_access_token(identity=email),
        "user_info": {
            "id": user.id,
            "nombre": user.nombre,
            "email": user.email,
            "artista": user.artista,
            "foto_usuario": user.foto_usuario,
            "descripcion":user.descripcion
        },
    }

    # retornamos el objeto Response devuelto por jsonify con la
    # configuracion mimetype application/json
    return jsonify(access_token)

# Login with Google
@api.route("/login_with_google", methods=["POST"])
def login_with_google():
    # recibimos los datos del front
    body = json.loads(request.data)
    
    # almacenamos la primera coincidencia de email en User
    user = User.query.filter_by(email=body["email"]).first()
    print(user)

    # Si el email o password no coindicen retornamos error de autentificacion
    if user == None:
        # Hash password
        hashed_password = current_app.bcrypt.generate_password_hash(
            body["password"]
        ).decode("utf-8")

        # Guardar nuevo user con hashed_password
        body = {
            x: body[x]
            for x in [
                "nombre",
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
        usuario = User.query.filter_by(email=body["email"]).first()

        print("id",usuario.id)
        direccion = Direccion(tipo_via="Avenida", nombre_via= "Andalucia", numero=2, piso=1, puerta="2A", user_id=usuario.id)
        db.session.add(direccion)
        db.session.commit()

    registered_user = User.query.filter_by(email=body["email"]).first()
    print(registered_user.serialize())
    access_token = {
        "token": create_access_token(identity=body["email"]),
        "user_info": {
            "id": registered_user.id,
            "nombre": registered_user.nombre,
            "email": registered_user.email,
            "artista": registered_user.artista,
            "foto_usuario": registered_user.foto_usuario,
            "descripcion":registered_user.descripcion
        },
    }

    # retornamos el objeto Response devuelto por jsonify con la
    # configuracion mimetype application/json
    return jsonify(access_token), 200

# Configuracion usuario
@api.route("/configuracion", methods=["PUT"])
@jwt_required()
def configuracion():

    user = get_jwt_identity()

    # Recibimos todos los datos del usuario menos contraseña
    body = json.loads(request.data)

    if body["password"]:

        hashed_password = current_app.bcrypt.generate_password_hash(
        body["password"]
        ).decode("utf-8")

    usuario_modificado = User.query.filter_by(id=body["id"]).first()

    direccion_usuario_modificado = Direccion.query.filter_by(user_id= usuario_modificado.id).first()

    user_keys = User.__table__.columns.keys()
    user_direccion_keys = Direccion.__table__.columns.keys()

    for edit_key in body:
        if body[edit_key] != None:

            usuario_modificado_srlz = usuario_modificado.serialize()

            if edit_key in user_keys:
                usuario_modificado_srlz["user_id"] = usuario_modificado_srlz["id"]
                usuario_modificado_srlz[edit_key] = body[edit_key]
                if body["password"]:
                    usuario_modificado_srlz["password"] = hashed_password
                    usuario_modificado.password = usuario_modificado_srlz["password"]
                
                usuario_modificado.nombre = usuario_modificado_srlz["nombre"]
                usuario_modificado.artista = usuario_modificado_srlz["artista"]
                usuario_modificado.nacimiento = usuario_modificado_srlz["nacimiento"]
                usuario_modificado.foto_usuario = usuario_modificado_srlz["foto_usuario"]
                usuario_modificado.descripcion = usuario_modificado_srlz["descripcion"]
                           
                db.session.commit()

            # Cambiamos también su direccion
            if direccion_usuario_modificado != None and edit_key in user_direccion_keys:

                direcion_modificada_srl= direccion_usuario_modificado.serialize()

                direcion_modificada_srl["direccion_id"] = direcion_modificada_srl["id"]
                direcion_modificada_srl[edit_key] = body[edit_key]
                direccion_usuario_modificado.tipo_via = direcion_modificada_srl["tipo_via"]
                direccion_usuario_modificado.nombre_via = direcion_modificada_srl["nombre_via"]
                direccion_usuario_modificado.numero = direcion_modificada_srl["numero"]
                direccion_usuario_modificado.piso = direcion_modificada_srl["piso"]
                direccion_usuario_modificado.puerta = direcion_modificada_srl["puerta"]
                
                db.session.commit()

    response_body = {
        "usuario": usuario_modificado_srlz, 
        "direccion": direcion_modificada_srl
    }

    return response_body, 200


# perfil usuario - artista
@api.route("/perfil_artista", methods=["POST", "GET"])
def handle_perfil_artista():

# Recogemos argumento id de la URL. Si no existe, el GET es global
    id = request.args.get('id')
    id, response_body = check_user_id(id)

    if len(response_body) != 0:
        return response_body, 400

    artista = User.query.filter_by(id=id).first()

    return json.dumps(artista.serialize()), 200


# perfil usuario - producto
@api.route("/perfil_galeria", methods=["POST", "GET"])
def handle_producto_galeria():
    # Recogemos argumento id de la URL
    user_id = request.args.get('id')
   
    if user_id:
        user_id, response_body = check_user_id(user_id)
        if len(response_body) != 0:
            return response_body, 400
        
    response_body = Producto.query.filter_by(vendedor_user_id=user_id).all()

    datos_user = User.query.filter_by(id=user_id).first()

    datos_user_srl = datos_user.serialize()
    lista_productos = []
    for producto in response_body:
        producto_srl = producto.serialize()
        producto_srl["vendedor_user_id"] = datos_user_srl["id"]
        producto_srl["vendedor_nombre"] = datos_user_srl["nombre"]
        producto_srl["vendedor_foto"] = datos_user_srl["foto_usuario"]
        lista_productos.append(producto_srl)


    return json.dumps(lista_productos), 200



@api.route("/productosInicio", methods=["GET"])
def handle_productosInicio():
    # GET sin user_id /api/producto
    response_body = Producto.query.filter_by(vendido=False).all()
    response_body = [producto.serialize() for producto in response_body]
    for artista in response_body:
        user = User.query.filter_by(id=artista["vendedor_user_id"]).first()
        # artista["vendedor_id"] = user.id
        artista["vendedor_nombre"] = user.nombre
        artista["vendedor_foto"] = user.foto_usuario
    print(response_body)
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
@api.route("/direccion", methods=["POST", "PUT","GET"])
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

        response_body = {"message": "Formulario de Registro OK"}

    elif request.method == "GET":

        user_id = request.args.get('user_id')

        direccion_user = Direccion.query.filter_by(user_id=user_id).first()
        direccion_user_srl = direccion_user.serialize()
        response_body = {"result": direccion_user_srl}

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
                direccion_modificada.nombre_via = direccion_modificada_srlz["nombre_via"]
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
            return response_body,208
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
        user_id = request.json.get("user_id", None)
        id_producto = request.json.get("producto_id", None)

        cesta_user = Cesta.query.filter_by(
            user_id=user_id, producto_id = id_producto
        ).first()

        db.session.delete(cesta_user)
        db.session.commit()

        response_body = {"result": "Producto borrado de cesta"}

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
            historico=False, id_comprador=body["id_comprador"])
        db.session.add(nuevo_pedido)
        db.session.commit()
        
		# Nos traemos la cesta del usuario comprador
        cesta_usuario = Cesta.query.filter_by(user_id=body["id_comprador"]).all()

        for producto_cesta in cesta_usuario:

			# Buscamos en la cesta del pedido el id del producto comprado para alterar su valor de la colunna pedido
            producto = Producto.query.filter_by(
                id=producto_cesta.producto_id
            ).first()


			# Borramos el producto de la cesta
            db.session.delete(producto_cesta)
    
            # Guardamos en la tabla de producto el id del pedido y lo marcamos como vendido
            producto.pedido_id = nuevo_pedido.id
            producto.vendido = True
			
            db.session.commit()
        
        response_body = {"message": "Formulario de Registro OK"}

    if request.method== "GET":

        # Recibimos id de cesta pedida
        user_id = request.args.get('user_id')

        # Obtenemos la lista de pedidos del usuario
        pedido_user = Pedido.query.filter_by(id_comprador=user_id).all()

        # Creamos el array que devolveremos con cada pedido y los productos adquiridos
        productos_info = []

        for pedido in pedido_user:
            pedido_srl = pedido.serialize()

            # Buscamos los productos seleccionados en ese pedido
            productos = Producto.query.filter_by(pedido_id=pedido_srl["id"]).all()

            for producto in productos:
                producto_srl = producto.serialize()
                print("ID", producto_srl["id"])
                # Buscamos el nombre y la foto de usuario para devolverlas en el valor productos_info
                userName = User.query.filter_by(id = producto_srl["vendedor_user_id"]).first()
                userName_srl = userName.serialize()
                producto_srl["vendedor_nombre"] = userName_srl["nombre"]
                producto_srl["vendedor_foto"] = userName_srl["foto_usuario"]
                productos_info.append(producto_srl)
            
            pedido_srl["productos_info"] = productos_info
        
            # [productos_info].append(pedido_srl)
            
            # print("productInfo",productos_info)
            
            print("pedido_srl",pedido_srl)

        response_body = {"result": pedido_srl}

    return response_body, 200


# searchBar
@api.route("/artistas", methods=["POST", "GET"])
def handle_artistas():
    response_body = User.query.filter_by(artista=True).order_by(User.nombre).all()
    response_body = [user.serialize() for user in response_body]

    return json.dumps(response_body), 200
