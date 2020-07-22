const BaseRepository = require("./base.repository");
let _proveedor = null;

class ProveedorRepository extends BaseRepository {
    constructor({ Proveedor }) {
        super(Proveedor);
        _proveedor = Proveedor;
    }
    async find(rif) {
        return await _proveedor.findOne({
            where: {
                rif,
            },
        });
    }
    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        // Check if sort key is an actual attribute of model
        if (!this.validSort(_proveedor, sortBy)) {
            return [];
        }
        if (!limitResults || !pageNum) {
            return await _proveedor.findAll({
                order: [[sortBy, orderBy]],
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _proveedor.findAll({
            limit,
            offset: (page - 1) * limit,
            order: [[sortBy, orderBy]],
        });
        const count = await _proveedor.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }

    async getProveedorByNombre(nombre) {
        return await _proveedor.findAll({
            where: {
                nombre,
            },
        });
    }

    async getCompras(proveedorId) {
        const proveedor = await _proveedor.findByPk(proveedorId);
        return await proveedor.getCompras();
    }
}

module.exports = ProveedorRepository;
