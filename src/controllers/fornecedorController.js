import Fornecedor from '../models/Fornecedor.js';

export async function store(req, res) {
  try {
    const { cnpj, nome } = req.body;

    // Verifica se todos os campos necessários foram fornecidos
    if (!cnpj || !nome) {
      return res.status(400).json({ errors: ['CNPJ e nome são obrigatórios'] });
    }

    // Verifica se já existe um fornecedor com o mesmo CNPJ
    const fornecedorExistente = await Fornecedor.findOne({ where: { cnpj } });
    if (fornecedorExistente) {
      return res.status(400).json({ errors: ['CNPJ já cadastrado'] });
    }

    // Cria o fornecedor
    const fornecedor = await Fornecedor.create(req.body);
    return res.status(201).json(fornecedor);

  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map(err => err.message) : ['Erro desconhecido'] });
  }
}


export async function index(req, res) {
  try {
    const fornecedores = await Fornecedor.findAll();
    return res.json(fornecedores);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'] });
  }
}

export async function show(req, res) {
  try {
    const fornecedor = await Fornecedor.findByPk(req.params.id);  // Buscando fornecedor pelo ID
    if (!fornecedor) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    return res.json(fornecedor);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'] });
  }
}

export async function update(req, res) {
  try {
    const fornecedor = await Fornecedor.findByPk(req.params.id);
    if (!fornecedor) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    await fornecedor.update(req.body);
    return res.json(fornecedor);
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'],
    });
  }
}


export async function destroy(req, res) {
  try {
    const fornecedor = await Fornecedor.findByPk(req.params.id);
    if (!fornecedor) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
    await fornecedor.destroy();
    return res.json({ message: 'Fornecedor removido com sucesso' });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'] });
  }
}