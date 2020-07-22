const BaseRepository = require("./base.repository");
let _grupo = null;

class GrupoRepository extends BaseRepository {
    constructor({ Grupo }) {
        super(Grupo);
        _grupo = Grupo;
    }
    async find(nombre) {
        return await _grupo.findOne({
            where: {
                nombre,
            },
        });
    }

    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        // Check if sort key is an actual attribute of model
        if (!this.validSort(_grupo, sortBy)) {
            return [];
        }
        if (!limitResults || !pageNum) {
            return await _grupo.findAll({
                order: [[sortBy, orderBy]],
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _grupo.findAll({
            limit,
            offset: (page - 1) * limit,
            order: [[sortBy, orderBy]],
        });
        const count = await _grupo.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }
    async getProductos(grupoId) {
        const grupo = await _grupo.findByPk(grupoId);
        return await grupo.getProductos();
    }
}

module.exports = GrupoRepository;
