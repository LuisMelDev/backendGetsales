const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ OperacionController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, OperacionController.getAll);
    router.get("/:id", AuthMiddleWare, OperacionController.get);
    router.get("/:id/usuarios", AuthMiddleWare, OperacionController.getUsuarios);
    router.post("", AuthMiddleWare, OperacionController.create);
    router.patch("/:id", AuthMiddleWare, OperacionController.update);
    router.delete("/:id", AuthMiddleWare, OperacionController.delete);

    return router;
};
