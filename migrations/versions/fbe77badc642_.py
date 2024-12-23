"""empty message

Revision ID: fbe77badc642
Revises: 191f196fa5ab
Create Date: 2024-12-13 05:36:03.760804

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'fbe77badc642'
down_revision = '191f196fa5ab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.alter_column('capital_inicial',
               existing_type=postgresql.DOUBLE_PRECISION(precision=53),
               nullable=True)
        batch_op.alter_column('moneda',
               existing_type=sa.VARCHAR(length=10),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.alter_column('moneda',
               existing_type=sa.VARCHAR(length=10),
               nullable=False)
        batch_op.alter_column('capital_inicial',
               existing_type=postgresql.DOUBLE_PRECISION(precision=53),
               nullable=False)

    # ### end Alembic commands ###
