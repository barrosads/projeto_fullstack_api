import { Model, DataTypes } from 'sequelize';

class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        telefone: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'Cliente',
        tableName: 'tb_clientes',
      }
    );
  }
}

export default Cliente;
