const BaseService = require("./base.service");
let _marcaRepository = null;

class MarcaService extends BaseService {
    constructor({ MarcaRepository }) {
        super(MarcaRepository);
        _marcaRepository = MarcaRepository;
    }

    async getProductos(marcaId) {
        return await _marcaRepository.getProductos(marcaId);
    }
}

module.exports = MarcaService;
