const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ RolController }) => {
    const router = Router();

    router.get("", AuthMiddleWare, RolController.getAll);
    router.get("/search", AuthMiddleWare, RolController.search);
    router.get("/:id", AuthMiddleWare, RolController.get);
    router.get("/:id/usuarios", AuthMiddleWare, RolController.getUsuarios);
    router.post("", AuthMiddleWare, RolController.create);
    router.patch("/:id", AuthMiddleWare, RolController.update);
    router.delete("/:id", AuthMiddleWare, RolController.delete);

    return router;
};
