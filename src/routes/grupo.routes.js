const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ GrupoController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, GrupoController.getAll);
    router.get("/search", AuthMiddleWare, GrupoController.search);
    router.get("/:id", AuthMiddleWare, GrupoController.get);
    router.get("/:id/productos", AuthMiddleWare, GrupoController.getProductos);
    router.post("", AuthMiddleWare, GrupoController.create);
    router.patch("/:id", AuthMiddleWare, GrupoController.update);
    router.delete("/:id", AuthMiddleWare, GrupoController.delete);

    return router;
};
