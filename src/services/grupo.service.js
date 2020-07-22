const BaseService = require("./base.service");
let _grupoRepository = null;

class GrupoService extends BaseService {
    constructor({ GrupoRepository }) {
        super(GrupoRepository);
        _grupoRepository = GrupoRepository;
    }

    async getProductos(grupoId) {
        return await _grupoRepository.getProductos(grupoId);
    }
}

module.exports = GrupoService;
