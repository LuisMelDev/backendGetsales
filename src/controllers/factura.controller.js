const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { facturaSchema } = require("../validations");
const { ErrorHelper } = require("../helpers");

let _facturaService = null;
let _bitacoraService = null;

class FacturaController {
    constructor({ FacturaService, BitacoraService }) {
        _facturaService = FacturaService;
        _bitacoraService = BitacoraService;
    }
    async get(req, res, next) {
        const { id } = req.params;
        try {
            const factura = await _facturaService.get(id);
            return res.send(factura);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getAll(req, res, next) {
        const { limit, page, sort_by, order_by } = req.query;
        try {
            const facturas = await _facturaService.getAll(
                limit,
                page,
                sort_by,
                order_by
            );
            return res.send(facturas);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async create(req, res, next) {
        const { user } = req;
        const { detalles, ...factura } = req.body;
        try {
            // Input validation
            await facturaSchema
                .validate(factura)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            if (!detalles || detalles.length < 1) {
                return ErrorHelper(
                    400,
                    "No se ha proveído productos para realizar la factura."
                );
            }
            // Check if stock is available for each product
            const stockChecker = await _facturaService.checkStock(detalles);
            stockChecker.forEach((status) => {
                if (status.overflow) {
                    return ErrorHelper(403, status.message);
                }
            });
            // Created and store data
            const createdFactura = await _facturaService.create(factura);
            const detallesData = detalles.map((detalle) => {
                return {
                    ...detalle,
                    factura_id: createdFactura.id,
                };
            });
            await _facturaService.createDetalles(detallesData);
            // Save record on bitacora
            await _bitacoraService.register(
                "CREATE",
                `FACTURAS(ID: ${createdFactura.id})`,
                user.id
            );
            return res.send(createdFactura);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async update(req, res, next) {
        const { body, user } = req;
        const { id } = req.params;
        try {
            await facturaSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            const updatedFactura = await _facturaService.update(id, body);
            await _bitacoraService.register(
                "UPDATE",
                `FACTURAS(ID: ${id})`,
                user.id
            );
            return res.send(updatedFactura);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const { user } = req;
        try {
            const deletedFactura = await _facturaService.delete(id);
            await _bitacoraService.register(
                "DELETE",
                `FACTURAS(ID: ${id})`,
                user.id
            );
            return res.send(deletedFactura);
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
            const factura = await _facturaService.getByFecha(options);
            return res.send(factura);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async getCliente(req, res, next) {
        const { id } = req.params;
        try {
            const factura = await _facturaService.get(id);
            const cliente = await factura.getCliente();
            return res.send(cliente);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async search(req, res, next) {
        const { cedula } = req.query;
        const options = { where: {} };
        if (cedula) {
            options.where.cedula = {
                [Op.like]: `%${cedula}%`,
            };
        }
        try {
            const facturas = await _facturaService.searchAll(options);
            return res.send(facturas);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = FacturaController;
