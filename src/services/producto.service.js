const BaseService = require("./base.service");
let _productoRepository = null;

class ProductoService extends BaseService {
    constructor({ ProductoRepository }) {
        super(ProductoRepository);
        _productoRepository = ProductoRepository;
    }
    async getProductoByNombre(nombre) {
        if (!nombre) {
            ErrorHelper(400, "nombre must be sent");
        }
        return await _productoRepository.getProductoByNombre();
    }
}

module.exports = ProductoService;
