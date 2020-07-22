const { generateToken } = require("../helpers/jwt.helper");
const { ErrorHelper } = require("../helpers");

let _userService = null;
let _rolService = null;

class AuthService {
    constructor({ UsuarioService, RolService }) {
        _userService = UsuarioService;
        _rolService = RolService;
    }

    async signUp(user) {
        const { username } = user;
        const userExist = await _userService.getUsuarioByUsername(username);
        if (userExist) {
            ErrorHelper(400, "El username ya se encuentra en uso.");
        }
        
        const created = await _userService.create(user);

        created.password =undefined
        return created
    }

    async signIn(user) {
        const { username, password } = user;
        const userExist = await _userService.getUsuarioByUsername(username);

        if (!userExist) {
            ErrorHelper(404, "El usuario no existe");
        }

        const validPassword = await userExist.validPassword(password);

        if (!validPassword) {
            ErrorHelper(401, "Contraseña o username invalidos");
        }

        const userToEnconde = {
            username: userExist.username,
            id: userExist.id,
            rol_id: userExist.rol_id
        };

        const token = generateToken(userToEnconde);
        userExist.password = undefined;

        return { token, user: userExist };
    }

    async signOut() {
        // TODO
    }
}

module.exports = AuthService;
