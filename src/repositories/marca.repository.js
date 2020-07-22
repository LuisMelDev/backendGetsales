const BaseRepository = require("./base.repository");
let _marca = null;

class MarcaRepository extends BaseRepository {
    constructor({ Marca }) {
        super(Marca);
        _marca = Marca;
    }

    async find(nombre) {
        return await _marca.findOne({
            where: {
                nombre,
            },
        });
    }

    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        // Check if sort key is an actual attribute of model
        if (!this.validSort(_marca, sortBy)) {
            return [];
        }
        if (!limitResults || !pageNum) {
            return await _marca.findAll({
                order: [[sortBy, orderBy]],
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _marca.findAll({
            limit,
            offset: (page - 1) * limit,
            order: [[sortBy, orderBy]],
        });
        const count = await _marca.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }

    async getProductos(marcaId) {
        const marca = await _marca.findByPk(marcaId);
        return await marca.getProductos();
    }
}

module.exports = MarcaRepository;
