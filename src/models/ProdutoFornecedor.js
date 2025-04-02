import { Model, DataTypes } from 'sequelize';

class ProdutoFornecedor extends Model {
  static init(sequelize) {
    super.init(
      {
        produto_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fornecedor_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'ProdutoFornecedor',
        tableName: 'tb_produto_fornecedor',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Produto, { foreignKey: 'produto_id' });
    this.belongsTo(models.Fornecedor, { foreignKey: 'fornecedor_id' });
  }
}

export default ProdutoFornecedor;
