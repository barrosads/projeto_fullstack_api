import User from '../models/User.js';

async function store(req, res) {
    try {
        const user = await User.create(req.body);
        return res.json(user);
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            errors: e.errors ? e.errors.map((err) => err.message) : ['Erro desconhecido'],
        });
    }
}

export default { store };  // Agora exporta um objeto com a função store