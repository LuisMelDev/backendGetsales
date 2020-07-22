const yup = require("yup");

const proveedorSchema = yup.object().shape({
    nombre: yup.string().required("'nombre' es un campo obligatorio."),
});

module.exports = proveedorSchema;
