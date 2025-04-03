import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
import produtoRoutes from './src/routes/produtoRoutes.js';
import fornecedorRoutes from './src/routes/fornecedorRoutes.js';
import produtoFornecedorRoutes from './src/routes/produtoFornecedorRoutes.js';
import clienteRoutes from './src/routes/clientesRoutes.js';
import estoqueRoutes from './src/routes/estoqueRoutes.js';

import './src/database/index.js';


class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json())
    }
    routes(){     
        this.app.use('/users/', userRoutes)     
        this.app.use('/produtos/', produtoRoutes)     
        this.app.use('/fornecedores/', fornecedorRoutes)     
        this.app.use('/produtos_fornecedores/', produtoFornecedorRoutes)
        this.app.use('/clientes/', clienteRoutes);
        this.app.use('/estoque/', estoqueRoutes);
    }
}



export default new App().app;