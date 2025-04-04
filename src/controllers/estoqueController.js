import estoqueMovimentacao from '../models/EstoqueMovimentacao.js';

export async function store(req, res) {
  try {

    const estoquemovimentacao = await estoqueMovimentacao.create(req.body);

    return res.status(201).json({
      message: 'laçamento inserido com sucesso!',
      estoquemovimentacao,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'],
    });
  }
}

export async function index(req, res) {
  try {
    const estoquemovimentacao = await estoqueMovimentacao.findAll();
    return res.json(estoquemovimentacao);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Não existe itens Cadastrados'] });
  }
}

export async function show(req, res) {
  try {
    const estoquemovimentacao = await estoqueMovimentacao.findByPk(req.params.id);
    if (!estoquemovimentacao) {
      return res.status(404).json({ error: 'item não encontrado' });
    }
    return res.json(estoquemovimentacao);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'] });
  }
}

// Atualizar um produto existente
export async function update(req, res) {
  try {
    const estoquemovimentacao = await estoqueMovimentacao.findByPk(req.params.id);
    if (!estoquemovimentacao) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    // Atualizar o produto com os novos dados
    await estoquemovimentacao.update(req.body);
    return res.json(estoquemovimentacao);
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'],
    });
  }
}

// Deletar um produto existente
export async function destroy(req, res) {
  try {
    const estoquemovimentacao = await estoqueMovimentacao.findByPk(req.params.id);
    if (!estoquemovimentacao) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Deletar o produto
    await estoquemovimentacao.destroy();
    return res.json({ message: 'item removido com sucesso' });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'],
    });
  }
}
