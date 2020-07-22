const { Router } = require("express");
const { AuthMiddleWare, AuthAdminMiddleWare } = require("../middlewares");

module.exports = ({ UsuarioController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, UsuarioController.getAll);
    router.get("/search", AuthMiddleWare, UsuarioController.search);
    router.get("/:id", AuthMiddleWare, UsuarioController.get);
    router.get(
        "/:id/operaciones",
        AuthMiddleWare,
        UsuarioController.getOperaciones
    );
    router.post(
        "",
        AuthMiddleWare,
        AuthAdminMiddleWare,
        UsuarioController.create
    );
    router.patch(
        "/:id",
        AuthMiddleWare,
        AuthAdminMiddleWare,
        UsuarioController.update
    );
    router.delete(
        "/:id",
        AuthMiddleWare,
        AuthAdminMiddleWare,
        UsuarioController.delete
    );

    return router;
};
