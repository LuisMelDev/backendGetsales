const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { productoSchema } = require("../validations");
const { ErrorHelper } = require("../helpers");

let _productoService = null;
let _bitacoraService = null;

class ProductoController {
    constructor({ ProductoService, BitacoraService }) {
        _productoService = ProductoService;
        _bitacoraService = BitacoraService;
    }
    async get(req, res, next) {
        const { id } = req.params;
        try {
            const producto = await _productoService.get(id);
            return res.send(producto);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getAll(req, res, next) {
        const { limit, page, sort_by, order_by } = req.query;
        try {
            const productos = await _productoService.getAll(
                limit,
                page,
                sort_by,
                order_by
            );
            return res.send(productos);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async create(req, res, next) {
        const { body, user } = req;
        try {
            // Validate input
            await productoSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));

            const createdProducto = await _productoService.create(body);
            await _bitacoraService.register(
                "CREATE",
                `PRODUCTOS(ID: ${createdProducto.id})`,
                user.id
            );
            return res.send(createdProducto);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async update(req, res, next) {
        const { body, user } = req;
        const { id } = req.params;
        try {
            await productoSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            const updatedProducto = await _productoService.update(id, body);
            await _bitacoraService.register(
                "UPDATE",
                `PRODUCTOS(ID: ${id})`,
                user.id
            );
            return res.send(updatedProducto);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const { user } = req;
        try {
            const deleteProduct = await _productoService.delete(id);
            await _bitacoraService.register(
                "DELETE",
                `PRODUCTOS(ID: ${id})`,
                user.id
            );
            return res.send(deleteProduct);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async getProductoByNombre(req, res, next) {
        const { nombre } = req.params;
        try {
            const producto = await _productoService.getProductoByNombre(nombre);
            return res.send(producto);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async search(req, res, next) {
        const { nombre, amperaje, grupo, marca } = req.query;
        const options = { where: {} };
        if (nombre) {
            options.where.nombre = {
                [Op.like]: `%${nombre}%`,
            };
        }
        if (amperaje) {
            options.where.amperaje_id = amperaje;
        }
        if (grupo) {
            options.where.grupo_id = grupo;
        }
        if (marca) {
            options.where.marca_id = marca;
        }
        try {
            const productos = await _productoService.searchAll(options);
            return res.send(productos);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = ProductoController;
