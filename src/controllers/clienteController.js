import Cliente from '../models/Cliente.js';

export async function store(req, res) {
  try {

    const cliente = await Cliente.create(req.body);

    return res.status(201).json({
      message: 'Cliente cadastrado com sucesso!',
      cliente,
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
    const cliente = await Cliente.findAll();
    return res.json(cliente);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'] });
  }
}

export async function show(req, res) {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    return res.json(cliente);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'] });
  }
}

// Atualizar um produto existente
export async function update(req, res) {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Atualizar o produto com os novos dados
    await cliente.update(req.body);
    return res.json(cliente);
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
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Deletar o produto
    await cliente.destroy();
    return res.json({ message: 'Cliente removido com sucesso' });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'],
    });
  }
}
