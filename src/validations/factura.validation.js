const yup = require("yup");

const facturaSchema = yup.object().shape({
    cliente_id: yup
        .number()
        .integer()
        .positive()
        .required("'cliente_id' es un campo obligatorio."),
    usuario_id: yup
        .number()
        .integer()
        .positive()
        .required("'usuario_id' es un campo obligatorio."),
});

module.exports = facturaSchema;
