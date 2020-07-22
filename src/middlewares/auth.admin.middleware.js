const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/configApp");
const ErrorHelper = require("../helpers/error.helper");

module.exports = (req, res, next) => {


if(req.headers.authorization){
        const token = req.headers["authorization"];
        if (!token) {
            ErrorHelper(400, "Token must be sent");
        }

        jwt.verify(token, JWT_SECRET, (err,decodedToken) => {
            if (err) {
                ErrorHelper(401, "Invalid token");
            }

        if(decodedToken.user.rol_id != 1 ){
                ErrorHelper(403, "Debes ser administrador");
        }

        next();


        });
    }else ErrorHelper(403, "Debes ingresar primero");

};