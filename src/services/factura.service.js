const BaseService = require("./base.service");
let _facturaRepository = null;
let _inventarioService = null;

class FacturaService extends BaseService {
    constructor({ FacturaRepository, InventarioRepository }) {
        super(FacturaRepository);
        _facturaRepository = FacturaRepository;
        _inventarioService = InventarioRepository;
    }
    async createDetalles(detalles) {
        return await _facturaRepository.createDetalles(detalles);
    }

    async getByFecha(options) {
        if (!options) {
            ErrorHelper(400, "fecha must be sent");
        }
        return await _facturaRepository.getByFecha(options);
    }
    async checkStock(detalles) {
        return Promise.all(
            detalles.map(async (producto) => {
                const stockProduct = await _inventarioService.stock(
                    producto.producto_id
                );
                if (producto.cantidad_producto > stockProduct) {
                    return {
                        overflow: true,
                        message: `Producto (ID: ${producto.producto_id}) no posee suficiente stock para realizar la operacion.`,
                    };
                }
                return {
                    overflow: false,
                    message: "",
                };
            })
        );
    }
}

module.exports = FacturaService;
