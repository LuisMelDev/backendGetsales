const { operacionSchema } = require("../validations");
const { ErrorHelper } = require("../helpers");

let _operacionService = null;
let _bitacoraService = null;

class OperacionController {
    constructor({ OperacionService, BitacoraService }) {
        _operacionService = OperacionService;
        _bitacoraService = BitacoraService;
    }
    async get(req, res, next) {
        const { id } = req.params;
        try {
            const operacion = await _operacionService.get(id);
            return res.send(operacion);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getAll(req, res, next) {
        const { limit, page, sort_by, order_by } = req.query;
        try {
            const operaciones = await _operacionService.getAll(
                limit,
                page,
                sort_by,
                order_by
            );
            return res.send(operaciones);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async create(req, res, next) {
        const { body, user } = req;
        try {
            // Validate input
            await operacionSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));

            // Check if record already exist
            const operacionExist = await _operacionService.find(body.operacion);
            if (operacionExist) {
                return ErrorHelper(
                    403,
                    "La operacion ya se encuentra registrada."
                );
            }
            const createdOperacion = await _operacionService.create(body);
            await _bitacoraService.register(
                "CREATE",
                `OPERACIONES(ID: ${createdOperacion.id})`,
                user.id
            );
            return res.send(createdOperacion);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async update(req, res, next) {
        const { body, user } = req;
        const { id } = req.params;
        try {
            await operacionSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            const updatedOperacion = await _operacionService.update(id, body);
            await _bitacoraService.register(
                "UPDATE",
                `OPERACIONES(ID: ${id})`,
                user.id
            );
            return res.send(updatedOperacion);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const { user } = req;
        try {
            const deletedOperacion = await _operacionService.delete(id);
            await _bitacoraService.register(
                "DELETE",
                `OPERACIONES(ID: ${id})`,
                user.id
            );
            return res.send(deletedOperacion);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getUsuarios(req, res, next) {
        const { id } = req.params;
        try {
            const operacion = await _operacionService.get(id);
            const usuarios = await operacion.getUsuarios();
            return res.send(usuarios);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = OperacionController;
