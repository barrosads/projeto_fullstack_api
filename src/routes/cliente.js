import { Router } from 'express';
import { store, index, show, update, destroy } from '../controllers/clienteController.js';

const clienteController = new Router();

clienteController.post('/', store);  // Rota para criar produto
clienteController.get('/', index);  
clienteController.get('/:id', show); 
clienteController.put('/:id', update);
clienteController.delete('/:id', destroy);

export default clienteController;