const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { compraSchema } = require("../validations");
const { ErrorHelper } = require("../helpers");

let _compraService = null;
let _bitacoraService = null;

class CompraController {
    constructor({ CompraService, BitacoraService }) {
        _compraService = CompraService;
        _bitacoraService = BitacoraService;
    }
    async get(req, res, next) {
        const { id } = req.params;
        try {
            const compra = await _compraService.get(id);
            return res.send(compra);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getAll(req, res, next) {
        const { limit, page, sort_by, order_by } = req.query;
        try {
            const compras = await _compraService.getAll(
                limit,
                page,
                sort_by,
                order_by
            );
            return res.send(compras);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async create(req, res, next) {
        const { user } = req;
        const { detalles, ...compra } = req.body;
        try {
            // Input validation
            await compraSchema
                .validate(compra)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            if (!detalles || detalles.length < 1) {
                return ErrorHelper(
                    400,
                    "No se ha proveído productos para realizar la compra."
                );
            }
            // Create and store data
            const createdCompra = await _compraService.create(compra);
            const detallesData = detalles.map((detalle) => {
                return {
                    ...detalle,
                    compra_id: createdCompra.id,
                };
            });
            await _compraService.createDetalles(detallesData);
            // Save record on bitacora
            await _bitacoraService.register(
                "CREATE",
                `COMPRAS(ID: ${createdCompra.id})`,
                user.id
            );
            return res.send(createdCompra);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async update(req, res, next) {
        const { body, user } = req;
        const { id } = req.params;
        try {
            await compraSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            const updatedCompra = await _compraService.update(id, body);
            await _bitacoraService("UPDATE", `COMPRAS(ID: ${id})`, user.id);
            return res.send(updatedCompra);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const { user } = req;
        try {
            const deletedCompra = await _compraService.delete(id);
            await _bitacoraService("DELETE", `COMPRAS(ID: ${id})`, user.id);
            return res.send(deletedCompra);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async getByFecha(req, res, next) {
        const { dia, mes, año } = req.query;
        const options = {};
        const filters = [];
        if (dia) {
            filters.push(
                Sequelize.where(
                    Sequelize.fn("DAY", Sequelize.col("fecha")),
                    dia
                )
            );
        }
        if (mes) {
            filters.push(
                Sequelize.where(
                    Sequelize.fn("MONTH", Sequelize.col("fecha")),
                    mes
                )
            );
        }
        if (año) {
            filters.push(
                Sequelize.where(
                    Sequelize.fn("YEAR", Sequelize.col("fecha")),
                    año
                )
            );
        }
        options.where = {
            [Op.and]: [...filters],
        };
        try {
            const compra = await _compraService.getByFecha(options);
            return res.send(compra);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async getProveedor(req, res, next) {
        const { id } = req.params;
        try {
            const compra = await _compraService.get(id);
            const proveedor = await compra.getProveedor();
            return res.send(proveedor);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async search(req, res, next) {
        const { rif } = req.query;
        const options = { where: {} };
        if (rif) {
            options.where.rif = {
                [Op.like]: `%${rif}%`,
            };
        }
        try {
            const compras = await _compraService.searchAll(options);
            return res.send(compras);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = CompraController;
