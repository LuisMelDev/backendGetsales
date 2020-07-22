const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { usuarioSchema } = require("../validations");
const { ErrorHelper } = require("../helpers");

let _usuarioService = null;
let _bitacoraService = null;

class UsuarioController {
    constructor({ UsuarioService, BitacoraService }) {
        _usuarioService = UsuarioService;
        _bitacoraService = BitacoraService;
    }
    async get(req, res, next) {
        const { id } = req.params;
        try {
            const usuario = await _usuarioService.get(id);
            return res.send(usuario);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getAll(req, res, next) {
        const { limit, page, sort_by, order_by } = req.query;
        try {
            const usuarios = await _usuarioService.getAll(
                limit,
                page,
                sort_by,
                order_by
            );
            return res.send(usuarios);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async create(req, res, next) {
        const { body, user } = req;
        try {
            await usuarioSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));

            const userExist = await _usuarioService.getUsuarioByUsername(
                body.username
            );
            if (userExist) {
                return ErrorHelper(
                    401,
                    "El usuario ya se encuentra registrado."
                );
            }
            const createdUsuario = await _usuarioService.create(body);
            await _bitacoraService.register(
                "CREATE",
                `USUARIOS(ID: ${createdUsuario.id})`,
                user.id
            );
            return res.send(createdUsuario);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async update(req, res, next) {
        const { body, user } = req;
        const { id } = req.params;
        try {
            const updatedUsuario = await _usuarioService.update(id, body);
            await _bitacoraService.register(
                "UPDATE",
                `USUARIOS(ID: ${id})`,
                user.id
            );
            return res.send(updatedUsuario);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const { user } = req;
        try {
            const deletedUsuario = await _usuarioService.delete(id);
            await _bitacoraService.register(
                "DELETE",
                `USUARIOS(ID: ${id})`,
                user.id
            );
            return res.send(deletedUsuario);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async getUsuarioByUsername(req, res, next) {
        const { username } = req.params;
        try {
            const usuario = await _usuarioService.getUsuarioByUsername(
                username
            );
            return res.send(usuario);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async getUsuarioByNombre(req, res, next) {
        const { nombre } = req.params;
        try {
            const usuario = await _usuarioService.getUsuarioByNombre(nombre);
            return res.send(usuario);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async getFacturas(req, res, next) {
        const { userId } = req.params;
        try {
            const usuarioFacturas = await _usuarioService.getFacturas(userId);
            return res.send(usuarioFacturas);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async getCompras(req, res, next) {
        const { userId } = req.params;
        try {
            const usuarioCompras = await _usuarioService.getCompras(userId);
            return res.send(usuarioCompras);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async getOperaciones(req, res, next) {
        const { id } = req.params;
        const { sort_by, order_by } = req.query;
        try {
            const operaciones = await _usuarioService.getOperaciones(id, sort_by, order_by);
            return res.send(operaciones);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async search(req, res, next) {
        const { nombre, username, rol, email } = req.query;
        const options = { where: {} };
        if (nombre) {
            options.where.nombre = {
                [Op.like]: `%${nombre}%`,
            };
        }
        if (username) {
            options.where.username = {
                [Op.like]: `%${username}%`,
            };
        }
        if (rol) {
            options.where.rol_id = rol;
        }
        if (email) {
            options.where.email = {
                [Op.like]: `%${email}%`,
            };
        }
        try {
            const usuarios = await _usuarioService.searchAll(options);
            return res.send(usuarios);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = UsuarioController;
