const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const { NotFoundMidlleware, ErrorMiddleware } = require("../middlewares");
/*
** Para documentacion luego **
const swaggerUI = require("swagger-ui-express");
const { SWAGGER_PATH } = require("../config");
const swaggerDocument = require(SWAGGER_PATH);    
*/

module.exports = function ({
    AuthRoutes,
    AmperajeRoutes,
    BitacoraRoutes,
    ClienteRoutes,
    CompraRoutes,
    FacturaRoutes,
    GrupoRoutes,
    InventarioRoutes,
    MarcaRoutes,
    OperacionRoutes,
    ProductoRoutes,
    ProveedorRoutes,
    RolRoutes,
    UsuarioRoutes,
}) {
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression())
        .use(express.urlencoded({ extended: true }));

    apiRoutes.use("/amperajes", AmperajeRoutes);
    apiRoutes.use("/bitacoras", BitacoraRoutes);
    apiRoutes.use("/clientes", ClienteRoutes);
    apiRoutes.use("/compras", CompraRoutes);
    apiRoutes.use("/facturas", FacturaRoutes);
    apiRoutes.use("/grupos", GrupoRoutes);
    apiRoutes.use("/inventarios", InventarioRoutes);
    apiRoutes.use("/marcas", MarcaRoutes);
    apiRoutes.use("/operaciones", OperacionRoutes);
    apiRoutes.use("/productos", ProductoRoutes);
    apiRoutes.use("/proveedores", ProveedorRoutes);
    apiRoutes.use("/roles", RolRoutes);
    apiRoutes.use("/usuarios", UsuarioRoutes);
    apiRoutes.use("/auth", AuthRoutes);

    router.use("/v1/api", apiRoutes);
    /*
     ** Para documentacion luego **
     router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
     
     */

    router.use(NotFoundMidlleware);
    router.use(ErrorMiddleware);

    return router;
};
