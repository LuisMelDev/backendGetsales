const { amperajeSchema } = require("../validations");
const { ErrorHelper } = require("../helpers");

let _amperajeService = null;
let _bitacoraService = null;

class AmperajeController {
    constructor({ AmperajeService, BitacoraService }) {
        _amperajeService = AmperajeService;
        _bitacoraService = BitacoraService;
    }
    async get(req, res, next) {
        const { id } = req.params;
        try {
            const amperaje = await _amperajeService.get(id);
            return res.send(amperaje);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getAll(req, res, next) {
        const { limit, page, sort_by, order_by } = req.query;
        try {
            const amperajes = await _amperajeService.getAll(
                limit,
                page,
                sort_by,
                order_by
            );
            return res.send(amperajes);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async create(req, res, next) {
        const { body, user } = req;
        try {
            // Validate input
            await amperajeSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            // Check if record already exist
            const amperajeExist = await _amperajeService.find(body.amp);
            if (amperajeExist) {
                return ErrorHelper(
                    403,
                    "El valor del amperaje ya se encuentra registrado."
                );
            }
            const createdAmperaje = await _amperajeService.create(body);
            await _bitacoraService.register(
                "CREATE",
                `AMPERAJES(ID: ${createdAmperaje.id})`,
                user.id
            );
            return res.send(createdAmperaje);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async update(req, res, next) {
        const { body, user } = req;
        const { id } = req.params;
        try {
            await amperajeSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            const updatedAmperaje = await _amperajeService.update(id, body);
            await _bitacoraService.register(
                "UPDATE",
                `AMPERAJES(ID: ${id})`,
                user.id
            );
            return res.send(updatedAmperaje);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const { user } = req;
        try {
            const deletedAmperaje = await _amperajeService.delete(id);
            await _bitacoraService.register(
                "DELETE",
                `AMPERAJES(ID: ${id})`,
                user.id
            );
            return res.send(deletedAmperaje);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getProductos(req, res, next) {
        const { id } = req.params;
        try {
            const amperaje = await _amperajeService.get(id);
            const productos = await amperaje.getProductos();
            return res.send(productos);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async search(req, res) {
        const { amp } = req.query;
        const options = { where: {} };
        if (amp) {
            options.where.amp = amp;
        }
        try {
            const amperajes = await _amperajeService.searchAll(options);
            return res.send(amperajes);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = AmperajeController;
