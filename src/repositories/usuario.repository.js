const BaseRepository = require("./base.repository");
let _usuario = null;
let _rol = null;
let _operacion = null;
let _bitacora = null;

class UsuarioRepository extends BaseRepository {
    constructor({ Usuario, Rol, Operacion, Bitacora }) {
        super(Usuario);
        _usuario = Usuario;
        _rol = Rol;
        _operacion = Operacion;
        _bitacora = Bitacora;
    }

    async get(userId) {
        return await _usuario.findByPk(userId, {
            include: [{ model: _rol, as: "rol" }],
        });
    }
    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        // Check if sort key is an actual attribute of model
        if (
            !this.validSort(_usuario, sortBy) &&
            !this.validSort(_rol, sortBy)
        ) {
            return [];
        }
        if (!limitResults || !pageNum) {
            return await _usuario.findAll({
                include: [{ model: _rol, as: "rol" }],
                order: [[sortBy, orderBy]],
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _usuario.findAll({
            limit,
            offset: (page - 1) * limit,
            include: [{ model: _rol, as: "rol" }],
            order: [[sortBy, orderBy]],
        });
        const count = await _usuario.count();
        const paginatedResults = this.getPaginate(limit, page, count);
        paginatedResults.results = results;
        return paginatedResults;
    }

    async getUsuarioByUsername(username) {
        return await _usuario.findOne({
            where: {
                username,
            },
            include: [{ model: _rol, as: "rol" }],
        });
    }

    async getUsuarioByNombre(nombre) {
        return await _usuario.findOne({
            where: {
                nombre,
            },
        });
    }
    async getFacturas(userId) {
        const usuario = await _usuario.findByPk(userId);
        return await usuario.getFacturas();
    }

    async getCompras(userId) {
        const usuario = await _usuario.findByPk(userId);
        return await usuario.getCompras();
    }
    async searchAll(options) {
        const optionsEager = {
            ...options,
            include: [{ model: _rol, as: "rol" }],
        };
        return await this.model.findAll(optionsEager);
    }

    async update(id, entity) {
        const user = await this.model.findByPk(id);

        Object.entries(entity).forEach(([field, value]) => {
            user[`${field}`] = value;
        });
        return await user.save();
    }
    async getOperaciones(userId, sortBy = "fecha", orderBy = "desc") {
        const registro = await _bitacora.findAll({
            where: {
                usuario_id: userId,
            },
            order: [[sortBy, orderBy]],
            include: [{ model: _operacion, as: "operacion" }],
        });
        return registro;
    }
}

module.exports = UsuarioRepository;
