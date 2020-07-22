const yup = require("yup");

const bitacoraSchema = yup.object().shape({
    fecha: yup.date().required("'fecha' es un campo obligatorio."),
    operacion_id: yup
        .number()
        .integer()
        .positive()
        .required("'operacion_id' es un campo obligatorio."),
    usuario_id: yup
        .number()
        .integer()
        .positive()
        .required("'usuario_id' es un campo obligatorio."),
});

module.exports = bitacoraSchema;
