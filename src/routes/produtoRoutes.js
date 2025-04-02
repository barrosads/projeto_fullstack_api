import { Router } from 'express';
import { store, index, show, update, destroy } from '../controllers/produtoController.js';

const produtoRoutes = new Router();

produtoRoutes.post('/', store);  // Rota para criar produto
produtoRoutes.get('/', index);  
produtoRoutes.get('/:id', show); 
produtoRoutes.put('/:id', update);
produtoRoutes.delete('/:id', destroy);

export default produtoRoutes;