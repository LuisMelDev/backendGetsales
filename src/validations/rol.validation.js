const yup = require("yup");

const rolSchema = yup.object().shape({
    rol: yup.string().required("'rol' es un campo obligatorio."),
});

module.exports = rolSchema;
