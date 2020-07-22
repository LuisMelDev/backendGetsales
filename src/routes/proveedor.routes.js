const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ ProveedorController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, ProveedorController.getAll);
    router.get("/search", AuthMiddleWare, ProveedorController.search);
    router.get("/:id", AuthMiddleWare, ProveedorController.get);
    router.get("/:id/compras", AuthMiddleWare, ProveedorController.getCompras);
    router.post("", AuthMiddleWare, ProveedorController.create);
    router.patch("/:id", AuthMiddleWare, ProveedorController.update);
    router.delete("/:id", AuthMiddleWare, ProveedorController.delete);

    return router;
};
