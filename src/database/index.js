import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../models/User.js';
import Produto from '../models/Produto.js';
import Fornecedor from '../models/Fornecedor.js';
import ProdutoFornecedor from '../models/ProdutoFornecedor.js';
import Cliente from '../models/Cliente.js';
import EstoqueMovimentacao from '../models/EstoqueMovimentacao.js';

// Inicializa a conexão com o banco de dados usando as configurações
const conexao = new Sequelize(databaseConfig);

// Inicializa os modelos
const models = [User, Produto, Fornecedor, ProdutoFornecedor, Cliente, EstoqueMovimentacao];
models.forEach((model) => model.init(conexao));

// Associa os modelos, se houver relações definidas
models.forEach((model) => model.associate && model.associate(conexao.models));

// Testando a conexão com o banco de dados
conexao.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi bem-sucedida!');
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

export default conexao;
