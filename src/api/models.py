from flask_sqlalchemy import SQLAlchemy
from api.utils import get_current_date


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    artista = db.Column(db.Boolean, nullable= False)
    nacimiento = db.Column(db.String(10))
    foto_usuario = db.Column(db.String(500))
    descripcion = db.Column(db.String(3000))

    # Enviamos FK
    productos = db.relationship('Producto', backref='user', lazy=True)
    comprador = db.relationship('Pedido', backref='user', lazy=True)
    direccion = db.relationship('Direccion', backref='user', lazy=True)
    cesta_comprador = db.relationship('Cesta', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "artista": self.artista,
            "nacimiento": self.nacimiento,
            "foto_usuario": self.foto_usuario,
            "descripcion": self.descripcion,
            # do not serialize the password, its a security breach
        }


class Producto (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    fecha_alta = db.Column(db.String(10), default=get_current_date, nullable=False)
    categoria = db.Column(db.String(20), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    vendido = db.Column(db.Boolean, default=False, nullable=False)
    foto_producto = db.Column(db.String(500), nullable=False)
    dimensiones = db.Column(db.String(10), nullable=False)
    descripcion = db.Column(db.String(3000), nullable=False)

    # Recibimos FK
    vendedor_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedido.id'), default=None)

    # Enviamos FK
    cesta_producto = db.relationship('Cesta', backref='producto', lazy=True)

    def __repr__(self):
        return '<Producto %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "fecha_alta": self.fecha_alta,
            "categoria": self.categoria,
            "precio": self.precio,
            "vendido": self.vendido,
            "foto_producto": self.foto_producto,
            "dimensiones": self.dimensiones,
            "descripcion": self.descripcion,
            "vendedor_user_id" : self.vendedor_user_id,
            "pedido_id": self.pedido_id
        }


class Direccion (db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tipo_via = db.Column(db.String(20), nullable=False)
    nombre_via = db.Column(db.String(20), nullable=False)
    numero= db.Column(db.Integer, nullable=False)
    piso = db.Column(db.Integer)
    puerta = db.Column(db.String(5), nullable=False)

    # Recibimos FK
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
   
    def __repr__(self):
        return '<Direccion %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "tipo_via": self.tipo_via,
            "nombre_via": self.nombre_via,
            "numero": self.numero,
            "piso": self.piso,
            "puerta": self.puerta,
            "user_id" : self.user_id
        }


class Cesta (db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Recibimos FK
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'))

    def __repr__(self):
        return '<Cesta %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "producto_id": self.producto_id,
            "producto":self.producto.serialize()
        }


class Pedido (db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fecha_pedido = db.Column(db.String(10), default=get_current_date, nullable=False)
    historico = db.Column(db.Boolean, nullable=False)

    # Recibimos FK
    id_comprador = db.Column(db.Integer, db.ForeignKey('user.id'))

    # Enviamos FK
    producto_pedido = db.relationship('Producto', backref='pedido', lazy=True)

    def __repr__(self):
        return '<Pedido %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "fecha_pedido": self.fecha_pedido,
            "historico": self.historico,
            "id_comprador" : self.id_comprador
            
        }
