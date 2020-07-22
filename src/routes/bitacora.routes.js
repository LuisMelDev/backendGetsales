const { Router } = require("express");
const { AuthMiddleWare, AuthAdminMiddleWare } = require("../middlewares");

module.exports = ({ BitacoraController }) => {
    const router = Router();

    router.get(
        "",
        AuthMiddleWare,
        AuthAdminMiddleWare,
        BitacoraController.getAll
    );
    return router;
};
