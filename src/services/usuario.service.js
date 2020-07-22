const BaseService = require("./base.service");
const { ErrorHelper } = require("../helpers");
let _usuarioRepository = null;

class UsuarioService extends BaseService {
    constructor({ UsuarioRepository }) {
        super(UsuarioRepository);
        _usuarioRepository = UsuarioRepository;
    }
    async getUsuarioByUsername(username) {
        if (!username) {
            ErrorHelper(400, "username must be sent");
        }
        return await _usuarioRepository.getUsuarioByUsername(username);
    }
    async getUsuarioByNombre(nombre) {
        if (!nombre) {
            ErrorHelper(400, "nombre must be sent");
        }
        return await _usuarioRepository.getUsuarioByNombre(nombre);
    }
    async getOperaciones(userId, sortBy, orderBy) {
        return await _usuarioRepository.getOperaciones(userId, sortBy, orderBy);
    }
    async getFacturas(userId) {
        return await _usuarioRepository.getFacturas(userId);
    }
    async getCompras(userId) {
        return await _usuarioRepository.getCompras(userId);
    }
}

module.exports = UsuarioService;
