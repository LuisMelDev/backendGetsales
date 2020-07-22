const BaseRepository = require("./base.repository");
let _amperaje = null;

class AmperajeRepository extends BaseRepository {
    constructor({ Amperaje }) {
        super(Amperaje);
        _amperaje = Amperaje;
    }
    async find(amp) {
        return await _amperaje.findOne({
            where: {
                amp,
            },
        });
    }
    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        // Check if sort key is an actual attribute of model
        if (!this.validSort(_amperaje, sortBy)) {
            return [];
        }
        if (!limitResults || !pageNum) {
            return await _amperaje.findAll({
                order: [[sortBy, orderBy]],
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _amperaje.findAll({
            limit,
            offset: (page - 1) * limit,
            order: [[sortBy, orderBy]],
        });
        const count = await _amperaje.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }
    async getProductos(amperajeId) {
        const amperaje = await _amperaje.findByPk(amperajeId);
        return await amperaje.getProductos();
    }
}

module.exports = AmperajeRepository;
