import app from './app.js';
import sequelize from './src/database/index.js'; 

const port = process.env.PORT || 3000;
sequelize.sync({ force: false })  
  .then(() => {
    console.log('Tabelas criadas!');
    app.listen(port, '0.0.0.0', () => {  // Escutando em todas as interfaces
        console.log(`Escutando na porta: ${port}`);
        console.log(`Acesse o servidor em: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });
