const BaseRepository = require("./base.repository");
let _cliente = null;

class ClienteRepository extends BaseRepository {
    constructor({ Cliente }) {
        super(Cliente);
        _cliente = Cliente;
    }
    async find(cedula) {
        return await _cliente.findOne({
            where: {
                cedula,
            },
        });
    }

    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        // Check if sort key is an actual attribute of model
        if (!this.validSort(_cliente, sortBy)) {
            return [];
        }
        if (!limitResults || !pageNum) {
            return await _cliente.findAll({
                order: [[sortBy, orderBy]],
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _cliente.findAll({
            limit,
            offset: (page - 1) * limit,
            order: [[sortBy, orderBy]],
        });
        const count = await _cliente.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }
    async getFacturas(clienteId) {
        const cliente = await _cliente.findByPk(clienteId);
        return await cliente.getFacturas();
    }
}

module.exports = ClienteRepository;
