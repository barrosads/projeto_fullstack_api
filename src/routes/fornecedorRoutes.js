import { Router } from 'express';
import * as fornecedorController from '../controllers/fornecedorController.js';

const router = new Router();

router.post('/', fornecedorController.store);
router.get('/', fornecedorController.index);
router.get('/:id', fornecedorController.show);
router.put('/:id', fornecedorController.update);
router.delete('/:id', fornecedorController.destroy);

export default router;
