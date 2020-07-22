const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ FacturaController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, FacturaController.getAll);
    router.get("/search", AuthMiddleWare, FacturaController.search);
    router.get("/date", AuthMiddleWare, FacturaController.getByFecha);
    router.get("/:id", AuthMiddleWare, FacturaController.get);
    router.get("/:id/cliente", AuthMiddleWare, FacturaController.getCliente);
    router.post("", AuthMiddleWare, FacturaController.create);
    router.patch("/:id", AuthMiddleWare, FacturaController.update);
    router.delete("/:id", AuthMiddleWare, FacturaController.delete);

    return router;
};
