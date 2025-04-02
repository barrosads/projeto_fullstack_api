import { Router } from 'express';
import * as produtoFornecedorController from '../controllers/produtoFornecedorController.js';

const router = new Router();

router.post('/associate', produtoFornecedorController.associateFornecedor);
router.post('/dissociate', produtoFornecedorController.dissociateFornecedor);
router.get('/', produtoFornecedorController.index);
router.get('/:id', produtoFornecedorController.show);

export default router;
