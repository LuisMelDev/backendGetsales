const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ MarcaController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, MarcaController.getAll);
    router.get("/search", AuthMiddleWare, MarcaController.search);
    router.get("/:id", AuthMiddleWare, MarcaController.get);
    router.get("/:id/productos", AuthMiddleWare, MarcaController.getProductos);
    router.post("", AuthMiddleWare, MarcaController.create);
    router.patch("/:id", AuthMiddleWare, MarcaController.update);
    router.delete("/:id", AuthMiddleWare, MarcaController.delete);

    return router;
};
