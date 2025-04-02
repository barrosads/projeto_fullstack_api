import { Model, DataTypes } from 'sequelize';

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        codigo_barras: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descricao: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        quantidade_estoque: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        categoria: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        data_validade: {
          type: DataTypes.DATE,
        },
        imagem_url: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'Produto',
        tableName: 'tb_produtos',
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Fornecedor, {
      through: models.ProdutoFornecedor,
      foreignKey: 'produto_id',
      otherKey: 'fornecedor_id'
    });
  }
}

export default Produto;
