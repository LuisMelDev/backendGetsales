let _bitacora = null;
let _usuario = null;
let _operacion = null;

class BitacoraRepository {
    constructor({ Bitacora, Usuario, Operacion }) {
        _bitacora = Bitacora;
        _usuario = Usuario;
        _operacion = Operacion;
    }
    async getAll(limitResults, pageNum, sortBy = "fecha", orderBy = "desc") {
        let order;
        if (sortBy === "username") {
            order = [["usuario", "username", orderBy]];
        } else if (sortBy === "operacion") {
            order = [["operacion", "operacion", orderBy]];
        } else {
            // Check if sort key is an actual attribute of model
            if (!this.validSort(_bitacora, sortBy)) {
                return [];
            }
            order = [[sortBy, orderBy]];
        }
        if (!limitResults || !pageNum) {
            return await _bitacora.findAll({
                include: [
                    { model: _usuario, as: "usuario" },
                    { model: _operacion, as: "operacion" },
                ],
                order,
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _bitacora.findAll({
            limit,
            offset: (page - 1) * limit,
            include: [
                { model: _usuario, as: "usuario" },
                { model: _operacion, as: "operacion" },
            ],
            order,
        });
        const count = await _bitacora.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }

    async getByUsuario(userId) {
        return await _bitacora.findOne({
            where: {
                usuario_id: userId,
            },
        });
    }
    async getByOperacion(operacionId) {
        return await _bitacora.findOne({
            where: {
                operacion_id: operacionId,
            },
        });
    }
    async register(operacionId, descripcion, usuarioId) {
        return await _bitacora.create({
            operacion_id: operacionId,
            descripcion,
            usuario_id: usuarioId,
        });
    }
    getPaginate(limit, page, count) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalPages = Math.ceil(count / limit);
        const paginationData = {};
        if (endIndex < count) {
            paginationData.next = {
                page: page + 1,
                limit,
            };
        }
        if (startIndex > 0) {
            paginationData.previous = {
                page: page + 1,
                limit,
            };
        }
        if (page > 1) {
            paginationData.first = {
                page: 1,
                limit,
            };
        }
        if (page != totalPages) {
            paginationData.last = {
                page: totalPages,
                limit,
            };
        }
        paginationData.totalPages = totalPages;
        return paginationData;
    }
    validSort(model, sortKey) {
        return model.rawAttributes.hasOwnProperty(sortKey);
    }
    async searchAll(options) {
        const optionsEager = {
            ...options,
            include: [
                { model: _usuario, as: "usuario" },
                { model: _operacion, as: "operacion" },
            ],
        };
        return await this.model.findAll(optionsEager);
    }
}

module.exports = BitacoraRepository;
