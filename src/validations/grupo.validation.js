const yup = require("yup");

const grupoSchema = yup.object().shape({
    nombre: yup.string().required("'nombre' es un campo obligatorio."),
});

module.exports = grupoSchema;
