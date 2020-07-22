const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { grupoSchema } = require("../validations");
const { ErrorHelper } = require("../helpers");

let _grupoService = null;
let _bitacoraService = null;

class GrupoController {
    constructor({ GrupoService, BitacoraService }) {
        _grupoService = GrupoService;
        _bitacoraService = BitacoraService;
    }
    async get(req, res, next) {
        const { id } = req.params;
        try {
            const grupo = await _grupoService.get(id);
            return res.send(grupo);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getAll(req, res, next) {
        const { limit, page, sort_by, order_by } = req.query;
        try {
            const grupos = await _grupoService.getAll(
                limit,
                page,
                sort_by,
                order_by
            );
            return res.send(grupos);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async create(req, res, next) {
        const { body, user } = req;
        try {
            // Validate input
            await grupoSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));

            // Check if record already exist
            const grupoExist = await _grupoService.find(body.nombre);
            if (grupoExist) {
                return ErrorHelper(403, "El grupo ya se encuentra registrado.");
            }
            const createdGrupo = await _grupoService.create(body);
            await _bitacoraService.register(
                "CREATE",
                `GRUPOS(ID: ${createdGrupo.id})`,
                user.id
            );
            return res.send(createdGrupo);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async update(req, res, next) {
        const { body, user } = req;
        const { id } = req.params;
        try {
            await grupoSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            const updatedGrupo = await _grupoService.update(id, body);
            await _bitacoraService.register(
                "UPDATE",
                `GRUPOS(ID: ${id})`,
                user.id
            );
            return res.send(updatedGrupo);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const { user } = req;
        try {
            const deletedGrupo = await _grupoService.delete(id);
            await _bitacoraService.register(
                "DELETE",
                `GRUPOS(ID: ${id})`,
                user.id
            );
            return res.send(deletedGrupo);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async getProductos(req, res, next) {
        const { grupoId } = req.params;
        try {
            const productos = await _grupoService.getProductos(grupoId);
            return res.send(productos);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async search(req, res, next) {
        const { nombre } = req.query;
        const options = { where: {} };
        if (nombre) {
            options.where.nombre = {
                [Op.like]: `%${nombre}%`,
            };
        }
        try {
            const grupos = await _grupoService.searchAll(options);
            return res.send(grupos);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = GrupoController;
