const BaseService = require("./base.service");
let _compraRepository = null;

class CompraService extends BaseService {
    constructor({ CompraRepository }) {
        super(CompraRepository);
        _compraRepository = CompraRepository;
    }
    async createDetalles(detalles) {
        return await _compraRepository.createDetalles(detalles);
    }
    async getByFecha(options) {
        if (!options) {
            ErrorHelper(400, "fecha must be sent");
        }
        return await _compraRepository.getByFecha(options);
    }
}

module.exports = CompraService;
