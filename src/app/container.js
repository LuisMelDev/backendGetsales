const { createContainer, asClass, asValue, asFunction } = require("awilix");

// config
const config = require("../config/config.json");
const configApp = require("../config/configApp");
const app = require(".");

//servicios
const {
    amperajeService,
    authService,
    bitacoraService,
    clienteService,
    compraService,
    facturaService,
    grupoService,
    inventarioService,
    marcaService,
    operacionService,
    productoService,
    proveedorService,
    rolService,
    usuarioService,
} = require("../services");

//controllers
const {
    amperajeController,
    authController,
    bitacoraController,
    clienteController,
    compraController,
    facturaController,
    grupoController,
    inventarioController,
    marcaController,
    operacionController,
    productoController,
    proveedorController,
    rolController,
    usuarioController,
} = require("../controllers");

// routes
const AuthRoutes = require("../routes/auth.routes");
const AmperajeRoutes = require("../routes/amperaje.routes");
const BitacoraRoutes = require("../routes/bitacora.routes");
const ClienteRoutes = require("../routes/cliente.routes");
const CompraRoutes = require("../routes/compra.routes");
const FacturaRoutes = require("../routes/factura.routes");
const GrupoRoutes = require("../routes/grupo.routes");
const InventarioRoutes = require("../routes/inventario.routes");
const MarcaRoutes = require("../routes/marca.routes");
const OperacionRoutes = require("../routes/operacion.routes");
const ProductoRoutes = require("../routes/producto.routes");
const ProveedorRoutes = require("../routes/proveedor.routes");
const RolRoutes = require("../routes/rol.routes");
const UsuarioRoutes = require("../routes/usuario.routes");

const Routes = require("../routes");

// models
const {
    amperajes,
    bitacora,
    clientes,
    compras,
    detalle_compras,
    detalle_facturas,
    facturas,
    grupos,
    inventarios,
    marcas,
    operaciones,
    productos,
    proveedores,
    roles,
    usuarios,
} = require("../models");

// repository
const {
    amperajeRepository,
    bitacoraRepository,
    clienteRepository,
    compraRepository,
    facturaRepository,
    grupoRepository,
    inventarioRepository,
    marcaRepository,
    operacionRepository,
    productoRepository,
    proveedorRepository,
    rolRepository,
    usuarioRepository,
} = require("../repositories");

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config),
        configApp: asValue(configApp),
    })
    .register({
        AmperajeService: asClass(amperajeService).singleton(),
        AuthService: asClass(authService).singleton(),
        BitacoraService: asClass(bitacoraService).singleton(),
        ClienteService: asClass(clienteService).singleton(),
        CompraService: asClass(compraService).singleton(),
        FacturaService: asClass(facturaService).singleton(),
        GrupoService: asClass(grupoService).singleton(),
        InventarioService: asClass(inventarioService).singleton(),
        MarcaService: asClass(marcaService).singleton(),
        OperacionService: asClass(operacionService).singleton(),
        ProductoService: asClass(productoService).singleton(),
        ProveedorService: asClass(proveedorService).singleton(),
        RolService: asClass(rolService).singleton(),
        UsuarioService: asClass(usuarioService).singleton(),
    })
    .register({
        AuthController: asClass(
            authController.bind(authController)
        ).singleton(),
        AmperajeController: asClass(
            amperajeController.bind(amperajeController)
        ).singleton(),
        BitacoraController: asClass(
            bitacoraController.bind(bitacoraController)
        ).singleton(),
        ClienteController: asClass(
            clienteController.bind(clienteController)
        ).singleton(),
        CompraController: asClass(
            compraController.bind(compraController)
        ).singleton(),
        FacturaController: asClass(
            facturaController.bind(facturaController)
        ).singleton(),
        GrupoController: asClass(
            grupoController.bind(grupoController)
        ).singleton(),
        InventarioController: asClass(
            inventarioController.bind(inventarioController)
        ).singleton(),
        MarcaController: asClass(
            marcaController.bind(marcaController)
        ).singleton(),
        OperacionController: asClass(
            operacionController.bind(operacionController)
        ).singleton(),
        ProductoController: asClass(
            productoController.bind(productoController)
        ).singleton(),
        ProveedorController: asClass(
            proveedorController.bind(proveedorController)
        ).singleton(),
        RolController: asClass(rolController.bind(rolController)).singleton(),
        UsuarioController: asClass(
            usuarioController.bind(usuarioController)
        ).singleton(),
    })
    .register({
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        AmperajeRoutes: asFunction(AmperajeRoutes).singleton(),
        BitacoraRoutes: asFunction(BitacoraRoutes).singleton(),
        ClienteRoutes: asFunction(ClienteRoutes).singleton(),
        CompraRoutes: asFunction(CompraRoutes).singleton(),
        FacturaRoutes: asFunction(FacturaRoutes).singleton(),
        GrupoRoutes: asFunction(GrupoRoutes).singleton(),
        InventarioRoutes: asFunction(InventarioRoutes).singleton(),
        MarcaRoutes: asFunction(MarcaRoutes).singleton(),
        OperacionRoutes: asFunction(OperacionRoutes).singleton(),
        ProductoRoutes: asFunction(ProductoRoutes).singleton(),
        ProveedorRoutes: asFunction(ProveedorRoutes).singleton(),
        RolRoutes: asFunction(RolRoutes).singleton(),
        UsuarioRoutes: asFunction(UsuarioRoutes).singleton(),
    })
    .register({
        Amperaje: asValue(amperajes),
        Bitacora: asValue(bitacora),
        Cliente: asValue(clientes),
        Compra: asValue(compras),
        DetalleCompra: asValue(detalle_compras),
        DetalleFactura: asValue(detalle_facturas),
        Factura: asValue(facturas),
        Grupo: asValue(grupos),
        Inventario: asValue(inventarios),
        Marca: asValue(marcas),
        Operacion: asValue(operaciones),
        Producto: asValue(productos),
        Proveedor: asValue(proveedores),
        Rol: asValue(roles),
        Usuario: asValue(usuarios),
    })
    .register({
        AmperajeRepository: asClass(amperajeRepository).singleton(),
        BitacoraRepository: asClass(bitacoraRepository).singleton(),
        ClienteRepository: asClass(clienteRepository).singleton(),
        CompraRepository: asClass(compraRepository).singleton(),
        FacturaRepository: asClass(facturaRepository).singleton(),
        GrupoRepository: asClass(grupoRepository).singleton(),
        InventarioRepository: asClass(inventarioRepository).singleton(),
        MarcaRepository: asClass(marcaRepository).singleton(),
        OperacionRepository: asClass(operacionRepository).singleton(),
        ProductoRepository: asClass(productoRepository).singleton(),
        ProveedorRepository: asClass(proveedorRepository).singleton(),
        RolRepository: asClass(rolRepository).singleton(),
        UsuarioRepository: asClass(usuarioRepository).singleton(),
    });

module.exports = container;
