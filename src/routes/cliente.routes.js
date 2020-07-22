const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ ClienteController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, ClienteController.getAll);
    router.get("/search", AuthMiddleWare,  ClienteController.search);
    router.get("/:id", AuthMiddleWare, ClienteController.get);
    router.get("/:id/facturas", AuthMiddleWare, ClienteController.getFacturas);
    router.post("", AuthMiddleWare, ClienteController.create);
    router.patch("/:id", AuthMiddleWare, ClienteController.update);
    router.delete("/:id", AuthMiddleWare, ClienteController.delete);

    return router;
};
