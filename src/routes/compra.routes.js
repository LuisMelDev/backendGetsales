const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ CompraController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, CompraController.getAll);
    router.get("/search", AuthMiddleWare, CompraController.search);
    router.get("/date", AuthMiddleWare, CompraController.getByFecha);
    router.get("/:id", AuthMiddleWare, CompraController.get);
    router.get("/:id/proveedor", AuthMiddleWare, CompraController.getProveedor);
    router.post("", AuthMiddleWare, CompraController.create);
    router.patch("/:id", AuthMiddleWare, CompraController.update);
    router.delete("/:id", AuthMiddleWare, CompraController.delete);

    return router;
};
