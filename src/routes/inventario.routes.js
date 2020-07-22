const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ InventarioController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, InventarioController.getAll);
    router.get("/:producto_id", AuthMiddleWare, InventarioController.get);
    // router.post("", InventarioController.create);
    // router.patch("/:producto_id", InventarioController.update);
    // router.delete("/:id", InventarioController.delete);

    return router;
};
