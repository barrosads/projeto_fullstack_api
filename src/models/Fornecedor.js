import { Model, DataTypes } from 'sequelize';

class Fornecedor extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cnpj: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            is: /^\d{14}$/i,  // Validação para CNPJ (14 dígitos numéricos)
            notEmpty: true,    // Não permitir campo vazio
          }
        },
        endereco: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        contato: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,    // Validação para e-mail
            notEmpty: true,   // Não permitir campo vazio
          }
        },
      },
      {
        sequelize,
        modelName: 'Fornecedor',
        tableName: 'tb_fornecedores',
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Produto, {
      through: models.ProdutoFornecedor,
      foreignKey: 'fornecedor_id',
      otherKey: 'produto_id',
    });
  }
}

export default Fornecedor;
