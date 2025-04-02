import ProdutoFornecedor from '../models/ProdutoFornecedor.js';
import Produto from '../models/Produto.js';
import Fornecedor from '../models/Fornecedor.js';

// Associa um fornecedor ao produto
export async function associateFornecedor(req, res) {
  try {
    const { produto_id, fornecedor_id } = req.body;
    
    // Verificando se o fornecedor já está associado ao produto
    const existingAssociation = await ProdutoFornecedor.findOne({
      where: { produto_id, fornecedor_id }
    });

    if (existingAssociation) {
      return res.status(400).json({ message: 'Fornecedor já está associado a este produto!' });
    }

    // Associando fornecedor ao produto
    const produtoFornecedor = await ProdutoFornecedor.create({ produto_id, fornecedor_id });

    return res.status(201).json({ message: 'Fornecedor associado com sucesso ao produto!' });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'] });
  }
}

// Desassocia um fornecedor de um produto
export async function dissociateFornecedor(req, res) {
  try {
    const { produto_id, fornecedor_id } = req.body;

    // Verificando se o fornecedor está associado ao produto
    const association = await ProdutoFornecedor.findOne({
      where: { produto_id, fornecedor_id }
    });

    if (!association) {
      return res.status(404).json({ message: 'Fornecedor não encontrado para este produto!' });
    }

    // Desassociando fornecedor do produto
    await association.destroy();

    return res.status(200).json({ message: 'Fornecedor desassociado com sucesso!' });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'] });
  }
}

// Lista todas as associações Produto-Fornecedor
export async function index(req, res) {
  try {
    const produtoFornecedores = await ProdutoFornecedor.findAll({
      include: [
        { model: Produto, as: 'Produto' },
        { model: Fornecedor, as: 'Fornecedor' },
      ],
    });

    return res.status(200).json(produtoFornecedores);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar produto-fornecedores' });
  }
}

// Busca uma associação específica de produto-fornecedor
export async function show(req, res) {
  try {
    const { id } = req.params; // O id vem da URL (ex: /:id)

    // Buscando a associação com base no ID
    const produtoFornecedor = await ProdutoFornecedor.findOne({
      where: { id },
      include: [
        { model: Produto, as: 'Produto' },
        { model: Fornecedor, as: 'Fornecedor' },
      ],
    });

    if (!produtoFornecedor) {
      return res.status(404).json({ message: 'Associação não encontrada!' });
    }

    return res.status(200).json(produtoFornecedor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar a associação!' });
  }
}
