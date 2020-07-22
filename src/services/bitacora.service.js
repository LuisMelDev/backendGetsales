let _bitacoraRepository = null;
let _operacionRepository = null;
let _usuarioRepository = null;

class BitacoraService {
    constructor({
        BitacoraRepository,
        OperacionRepository,
        UsuarioRepository,
    }) {
        _bitacoraRepository = BitacoraRepository;
        _operacionRepository = OperacionRepository;
        _usuarioRepository = UsuarioRepository;
    }
    async getByUsuario(usuarioId) {
        return await _bitacoraRepository.getByOperacion(usuarioId);
    }
    async getByOperacion(operacionId) {
        return await _bitacoraRepository.getByOperacion(operacionId);
    }
    async getAll(limitResults, pageNum, sortBy, orderBy) {
        return await _bitacoraRepository.getAll(
            limitResults,
            pageNum,
            sortBy,
            orderBy
        );
    }
    async register(operacionName, description, usuarioId) {
        const operacion = await _operacionRepository.getByOperacion(
            operacionName
        );
        const usuario = await _usuarioRepository.get(usuarioId);
        return await _bitacoraRepository.register(
            operacion.id,
            description,
            usuario.id
        );
    }
}

module.exports = BitacoraService;
