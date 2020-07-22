const yup = require("yup");

const marcaSchema = yup.object().shape({
    nombre: yup.string().required("'nombre' es un campo obligatorio."),
});

module.exports = marcaSchema;
