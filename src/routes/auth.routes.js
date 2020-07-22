const { Router } = require("express");
const { AuthMiddleWare } = require("../middlewares");

module.exports = ({ AuthController }) => {
    const router = Router();

    router.post("/signup", AuthController.signUp);
    router.post("/signin", AuthController.signIn);
    router.post("/signout", AuthMiddleWare, AuthController.signOut);

    return router;
};
