"""empty message

Revision ID: 2edc19820b5c
Revises: 0e3a4b606330
Create Date: 2022-07-11 10:04:18.937460

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2edc19820b5c'
down_revision = '0e3a4b606330'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pedido', sa.Column('id_cesta', sa.Integer(), nullable=True))
    op.add_column('pedido', sa.Column('id_direccion', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'pedido', 'direccion', ['id_direccion'], ['id'])
    op.create_foreign_key(None, 'pedido', 'cesta', ['id_cesta'], ['id'])
    op.add_column('producto', sa.Column('pedido_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'producto', 'pedido', ['pedido_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'producto', type_='foreignkey')
    op.drop_column('producto', 'pedido_id')
    op.drop_constraint(None, 'pedido', type_='foreignkey')
    op.drop_constraint(None, 'pedido', type_='foreignkey')
    op.drop_column('pedido', 'id_direccion')
    op.drop_column('pedido', 'id_cesta')
    # ### end Alembic commands ###