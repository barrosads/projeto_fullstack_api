import Produto from '../models/Produto.js';

export async function store(req, res) {
  try {
    // Verificar se o código de barras já está cadastrado
    const produtoExistente = await Produto.findOne({
      where: { codigo_barras: req.body.codigo_barras },
    });

    if (produtoExistente) {
      return res.status(400).json({
        error: 'Produto com este código de barras já está cadastrado!',
      });
    }

    // Validação de campos obrigatórios
    const { nome, codigo_barras, descricao, quantidade_estoque, categoria } = req.body;

    if (!nome || !codigo_barras || !descricao || !quantidade_estoque || !categoria) {
      return res.status(400).json({
        error: 'Todos os campos obrigatórios (nome, código de barras, descrição, quantidade de estoque, categoria) devem ser preenchidos!',
      });
    }

    // Validação de quantidade em estoque
    if (isNaN(quantidade_estoque) || quantidade_estoque < 0) {
      return res.status(400).json({
        error: 'Quantidade em estoque deve ser um número válido e maior ou igual a 0!',
      });
    }

    // Criar o produto
    const produto = await Produto.create(req.body);

    return res.status(201).json({
      message: 'Produto cadastrado com sucesso!',
      produto,
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
    const produtos = await Produto.findAll();
    return res.json(produtos);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'] });
  }
}

export async function show(req, res) {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    return res.json(produto);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'] });
  }
}

// Atualizar um produto existente
export async function update(req, res) {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Atualizar o produto com os novos dados
    await produto.update(req.body);
    return res.json(produto);
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
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Deletar o produto
    await produto.destroy();
    return res.json({ message: 'Produto removido com sucesso' });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'],
    });
  }
}
