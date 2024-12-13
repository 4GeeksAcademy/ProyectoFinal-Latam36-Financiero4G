"""empty message

Revision ID: 191f196fa5ab
Revises: bf73c45b4f92
Create Date: 2024-12-13 00:28:57.245329

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '191f196fa5ab'
down_revision = 'bf73c45b4f92'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categorias_egreso',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('nombre')
    )
    op.create_table('categorias_ingreso',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('nombre')
    )
    op.create_table('usuarios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre_usuario', sa.String(length=50), nullable=False),
    sa.Column('correo', sa.String(length=120), nullable=False),
    sa.Column('contrasena_hash', sa.String(length=128), nullable=False),
    sa.Column('creado_en', sa.DateTime(), nullable=True),
    sa.Column('capital_inicial', sa.Float(), nullable=False),
    sa.Column('moneda', sa.String(length=10), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('correo'),
    sa.UniqueConstraint('nombre_usuario')
    )
    op.create_table('alertas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mensaje', sa.String(length=255), nullable=False),
    sa.Column('leida', sa.Boolean(), nullable=True),
    sa.Column('creada_en', sa.DateTime(), nullable=True),
    sa.Column('usuario_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuarios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('egresos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('monto', sa.Float(), nullable=False),
    sa.Column('descripcion', sa.String(length=255), nullable=True),
    sa.Column('fecha', sa.DateTime(), nullable=True),
    sa.Column('usuario_id', sa.Integer(), nullable=False),
    sa.Column('categoria_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['categoria_id'], ['categorias_egreso.id'], ),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuarios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('fondos_emergencia',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('monto_meta', sa.Float(), nullable=False),
    sa.Column('monto_actual', sa.Float(), nullable=True),
    sa.Column('usuario_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuarios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ingresos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('monto', sa.Float(), nullable=False),
    sa.Column('descripcion', sa.String(length=255), nullable=True),
    sa.Column('fecha', sa.DateTime(), nullable=True),
    sa.Column('usuario_id', sa.Integer(), nullable=False),
    sa.Column('categoria_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['categoria_id'], ['categorias_ingreso.id'], ),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuarios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('planes_ahorro',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('monto_meta', sa.Float(), nullable=False),
    sa.Column('monto_actual', sa.Float(), nullable=True),
    sa.Column('descripcion', sa.String(length=255), nullable=True),
    sa.Column('fecha_objetivo', sa.DateTime(), nullable=True),
    sa.Column('usuario_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuarios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('suscripciones',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=100), nullable=False),
    sa.Column('costo', sa.Float(), nullable=False),
    sa.Column('frecuencia', sa.String(length=50), nullable=False),
    sa.Column('usuario_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuarios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('suscripciones')
    op.drop_table('planes_ahorro')
    op.drop_table('ingresos')
    op.drop_table('fondos_emergencia')
    op.drop_table('egresos')
    op.drop_table('alertas')
    op.drop_table('usuarios')
    op.drop_table('categorias_ingreso')
    op.drop_table('categorias_egreso')
    # ### end Alembic commands ###
