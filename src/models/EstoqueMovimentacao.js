import { Model, DataTypes } from 'sequelize';

class EstoqueMovimentacao extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: {
          type: DataTypes.ENUM('entrada', 'saida'),
          allowNull: false,
        },
        quantidade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        produto_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'tb_produtos',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'EstoqueMovimentacao',
        tableName: 'tb_estoque_movimentacoes',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' });
  }
}

export default EstoqueMovimentacao;
