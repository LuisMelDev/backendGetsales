const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");
module.exports = ({ AmperajeController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, AmperajeController.getAll);
    router.get("/search", AuthMiddleWare, AmperajeController.search);
    router.get("/:id", AuthMiddleWare, AmperajeController.get);
    router.get(
        "/:id/productos",
        AuthMiddleWare,
        AmperajeController.getProductos
    );
    router.post("", AuthMiddleWare, AmperajeController.create);
    router.patch("/:id", AuthMiddleWare, AmperajeController.update);
    router.delete("/:id", AuthMiddleWare, AmperajeController.delete);

    return router;
};
