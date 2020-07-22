const BaseService = require("./base.service");
let _inventarioRepository = null;

class InventarioService extends BaseService {
    constructor({ InventarioRepository }) {
        super(InventarioRepository);
        _inventarioRepository = InventarioRepository;
    }
    async getByFecha(fecha_entrada) {
        if (!fecha_entrada) {
            ErrorHelper(400, "fecha must be sent");
        }
        return await _inventarioRepository.getByFecha();
    }
    async stock(productoId) {
        return await _inventarioRepository.stock(productoId);
    }
}

module.exports = InventarioService;
