const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/configApp");
const ErrorHelper = require("../helpers/error.helper");

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        ErrorHelper(401, "Token must be sent");
    }

    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            ErrorHelper(401, "Invalid token");
        }
        req.user = decodedToken.user;
        next();
    });
};
