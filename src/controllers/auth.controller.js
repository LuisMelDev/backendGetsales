const { usuarioSchema } = require("../validations");
const { ErrorHelper } = require("../helpers");

let _authService = null;
let _bitacoraService = null;

class AuthController {
    constructor({ AuthService, BitacoraService }) {
        _authService = AuthService;
        _bitacoraService = BitacoraService;
    }

    async signUp(req, res, next) {
        const { body } = req;
        try {
            await usuarioSchema
                .validate(body)
                .catch((err) => ErrorHelper(401, err.errors[0]));

            const createdUser = await _authService.signUp(body);
            await _bitacoraService.register(
                "REGISTER",
                "El usuario se ha registrado exitosamente.",
                createdUser.id
            );
            return res.status(201).send(createdUser);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async signIn(req, res, next) {
        const { body } = req;
        try {
            const creds = await _authService.signIn(body);
            await _bitacoraService.register(
                "LOGIN",
                "El usuario ha iniciado sesion.",
                creds.user.id
            );
            return res.send(creds);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    async signOut(req, res) {
        const { user } = req;
        try {
            await _bitacoraService.register(
                "LOGOUT",
                "El usuario ha cerrado sesion.",
                user.id
            );
            return res.send({
                message: `${user.username} ha cerrado sesion satisfactoriamente.`,
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = AuthController;
