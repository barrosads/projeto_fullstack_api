import { Router } from 'express';
import { store, index, show, update, destroy } from '../controllers/estoqueController.js';

const estoqueController = new Router();

estoqueController.post('/', store);  // Rota para criar produto
estoqueController.get('/', index);  
estoqueController.get('/:id', show); 
estoqueController.put('/:id', update);
estoqueController.delete('/:id', destroy);

export default estoqueController;