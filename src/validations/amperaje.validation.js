const yup = require("yup");

const amperajeSchema = yup.object().shape({
    amp: yup.number().integer().required("'amp' es un campo obligatorio."),
});

module.exports = amperajeSchema;
