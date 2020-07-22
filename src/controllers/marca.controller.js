const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { marcaSchema } = require("../validations");
const { ErrorHelper } = require("../helpers");

let _marcaService = null;
let _bitacoraService = null;

class MarcaController {
    constructor({ MarcaService, BitacoraService }) {
        _marcaService = MarcaService;
        _bitacoraService = BitacoraService;
    }
    async get(req, res, next) {
        const { id } = req.params;
        try {
            const marca = await _marcaService.get(id);
            return res.send(marca);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getAll(req, res, next) {
        const { limit, page, sort_by, order_by } = req.query;
        try {
            const marcas = await _marcaService.getAll(
                limit,
                page,
                sort_by,
                order_by
            );
            return res.send(marcas);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async create(req, res, next) {
        const { body, user } = req;
        try {
            await marcaSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            const createdMarca = await _marcaService.create(body);
            await _bitacoraService.register(
                "CREATE",
                `MARCAS(ID: ${createdMarca.id})`,
                user.id
            );
            return res.send(createdMarca);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async update(req, res, next) {
        const { body, user } = req;
        const { id } = req.params;
        try {
            // Validate input
            await marcaSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));

            // Check if record already exist
            const marcaExist = await _marcaService.find(body.nombre);
            if (marcaExist) {
                return ErrorHelper(403, "La marca ya se encuentra registrada.");
            }
            const updatedMarca = await _marcaService.update(id, body);
            await _bitacoraService.register(
                "UPDATE",
                `MARCAS(ID: ${id})`,
                user.id
            );
            return res.send(updatedMarca);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const { user } = req;
        try {
            const deletedMarca = await _marcaService.delete(id);
            await _bitacoraService.register(
                "DELETE",
                `MARCAS(ID: ${id})`,
                user.id
            );
            return res.send(deletedMarca);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getProductos(req, res, next) {
        const { marcaId } = req.params;
        try {
            const productos = await _marcaService.getProductos(marcaId);
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
            const marca = await _marcaService.searchAll(options);
            return res.send(marca);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = MarcaController;
