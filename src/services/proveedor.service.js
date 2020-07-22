const BaseService = require("./base.service");
let _proveedorRepository = null;

class ProveedorService extends BaseService {
    constructor({ ProveedorRepository }) {
        super(ProveedorRepository);
        _proveedorRepository = ProveedorRepository;
    }
    async getProveedorByNombre(nombre) {
        if (!nombre) {
            ErrorHelper(400, "nombre must be sent");
        }
        return await _proveedorRepository.getProveedorByNombre();
    }

    async getCompras(proveedorId) {
        return await _proveedorRepository.getCompras(proveedorId);
    }
}

module.exports = ProveedorService;
