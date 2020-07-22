const yup = require("yup");

const usuarioSchema = yup.object().shape({
    rol_id: yup
        .number()
        .integer()
        .positive()
        .required("'rol_id' es un campo obligatorio."),
    nombre: yup.string().required("'nombre' es un campo obligatorio."),
    username: yup.string().required("'username' es un campo obligatorio."),
    password: yup
        .string()
        .required()
        .min(8, "Contraseña muy corta - debe tener 8 carácteres como mínimo.")
        .max(
            12,
            "Contraseña muy larga - debe tener 12 carácteres como máximo."
        ),
    email: yup.string().email().required("'email' es un campo obligatorio."),
});

module.exports = usuarioSchema;
