const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { clienteSchema } = require("../validations");
const { ErrorHelper } = require("../helpers");

let _clienteService = null;
let _bitacoraService = null;

class ClienteController {
    constructor({ ClienteService, BitacoraService }) {
        _clienteService = ClienteService;
        _bitacoraService = BitacoraService;
    }
    async get(req, res, next) {
        const { id } = req.params;
        try {
            const cliente = await _clienteService.get(id);
            return res.send(cliente);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getAll(req, res, next) {
        const { limit, page, sort_by, order_by } = req.query;
        try {
            const clientes = await _clienteService.getAll(
                limit,
                page,
                sort_by,
                order_by
            );
            return res.send(clientes);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async create(req, res, next) {
        const { body, user } = req;
        try {
            // Validate input
            await clienteSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            // Check if record already exist
            const exists = await _clienteService.find(body.cedula);
            if (exists) {
                return ErrorHelper(
                    403,
                    "El cliente ya se encuentra registrado."
                );
            }
            const createdCliente = await _clienteService.create(body);
            await _bitacoraService.register(
                "CREATE",
                `CLIENTES(ID: ${createdCliente.id})`,
                user.id
            );
            return res.send(createdCliente);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async update(req, res, next) {
        const { body, user } = req;
        const { id } = req.params;
        try {
            await clienteSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));
            const updatedCliente = await _clienteService.update(id, body);
            await _bitacoraService.register(
                "UPDATE",
                `CLIENTES(ID: ${id})`,
                user.id
            );
            return res.send(updatedCliente);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const { user } = req;
        try {
            const deletedCliente = await _clienteService.delete(id);
            await _bitacoraService.register(
                "DELETE",
                `CLIENTES(ID: ${id})`,
                user.id
            );
            return res.send(deletedCliente);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getFacturas(req, res, next) {
        const { clienteId } = req.params;
        try {
            const facturas = await _clienteService.getFacturas(clienteId);
            return res.send(facturas);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async search(req, res, next) {
        const { cedula, nombre, email } = req.query;
        const options = { where: {} };
        if (cedula) {
            options.where.cedula = {
                [Op.like]: `%${cedula}%`,
            };
        }
        if (nombre) {
            options.where.nombre = {
                [Op.like]: `%${nombre}%`,
            };
        }
        if (email) {
            options.where.email = {
                [Op.like]: `%${email}%`,
            };
        }
        try {
            const clientes = await _clienteService.searchAll(options);
            return res.send(clientes);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = ClienteController;
