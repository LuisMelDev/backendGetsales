const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ ProductoController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, ProductoController.getAll);
    router.get("/search", AuthMiddleWare, ProductoController.search);
    router.get("/:id", AuthMiddleWare, ProductoController.get);
    router.post("", AuthMiddleWare, ProductoController.create);
    router.patch("/:id", AuthMiddleWare, ProductoController.update);
    router.delete("/:id", AuthMiddleWare, ProductoController.delete);

    return router;
};
