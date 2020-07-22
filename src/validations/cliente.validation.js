const yup = require("yup");

const clienteSchema = yup.object().shape({
    cedula: yup.string().required("'cedula' es un campo obligatorio."),
    nombre: yup.string().required("'nombre' es un campo obligatorio."),
    direccion: yup.string().required("'direccion' es un campo obligatorio."),
    fecha_nacimiento: yup
        .date()
        .required("'fecha_nacimiento' es un campo obligatorio."),
    telefono: yup.string().required("'telefono' es un campo obligatorio."),
    email: yup
        .string()
        .email("Email no válido")
        .required("'email' es un campo obligatorio."),
});

module.exports = clienteSchema;
