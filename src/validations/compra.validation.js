const yup = require("yup");

const compraSchema = yup.object().shape({
    proveedor_id: yup
        .number()
        .integer()
        .positive()
        .required("'proveedor_id' es un campo obligatorio."),
    usuario_id: yup
        .number()
        .integer()
        .positive()
        .required("'usuario_id' es un campo obligatorio."),
});

module.exports = compraSchema;
