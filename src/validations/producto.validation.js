const yup = require("yup");

const productoSchema = yup.object().shape({
    nombre: yup.string().required("'nombre' es un campo obligatorio."),
    // imagen: yup.string().required("'imagen' es un campo obligatorio."),
    amperaje_id: yup
        .number()
        .integer()
        .positive()
        .required("'amperaje_id' es un campo obligatorio."),
    grupo_id: yup
        .number()
        .integer()
        .positive()
        .required("'grupo_id' es un campo obligatorio."),
    marca_id: yup
        .number()
        .integer()
        .positive()
        .required("'marca_id' es un campo obligatorio."),
});

module.exports = productoSchema;
