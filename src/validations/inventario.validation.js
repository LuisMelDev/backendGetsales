const yup = require("yup");
/* not need it by now */
const inventarioSchema = yup.object().shape({
    producto_id: yup.number().integer().positive().required(),
    fecha_entrada: yup.date().required(),
    existencia_producto: yup.number().integer().required(),
});

module.exports = inventarioSchema;
