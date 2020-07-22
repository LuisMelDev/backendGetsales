const yup = require("yup");

const operacionSchema = yup.object().shape({
    operacion: yup.string().required("'operacion' es un campo obligatorio."),
});

module.exports = operacionSchema;
