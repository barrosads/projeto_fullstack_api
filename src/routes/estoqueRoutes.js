import express from 'express';
import Produto from '../models/Produto.js';
import EstoqueMovimentacao from '../models/EstoqueMovimentacao.js';

const router = express.Router();

router.post('/movimentar', async (req, res) => {
  try {
    const { produto_id, quantidade, tipo } = req.body;

    const produto = await Produto.findByPk(produto_id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (tipo === 'saida' && produto.quantidade_estoque < quantidade) {
      return res.status(400).json({ error: 'Estoque insuficiente' });
    }

    const novaQuantidade =
      tipo === 'entrada'
        ? produto.quantidade_estoque + quantidade
        : produto.quantidade_estoque - quantidade;

    await produto.update({ quantidade_estoque: novaQuantidade });


    const movimentacao = await EstoqueMovimentacao.create({
      produto_id,
      quantidade,
      tipo,
    });

    res.status(201).json(movimentacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
