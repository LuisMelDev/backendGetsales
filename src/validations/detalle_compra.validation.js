const yup = require("yup");

const detalleCompraSchema = yup.object().shape({
    compra_id: yup
        .number()
        .integer()
        .positive()
        .required("'compra_id' es un campo obligatorio."),
    producto_id: yup
        .number()
        .integer()
        .positive()
        .required("'producto_id' es un campo obligatorio."),
    cantidad_producto: yup
        .number()
        .integer()
        .positive()
        .required("'cantidad_producto' es un campo obligatorio."),
    precio_producto: yup
        .number()
        .positive()
        .required("'precio_producto' es un campo obligatorio."),
});

module.exports = detalleCompraSchema;
