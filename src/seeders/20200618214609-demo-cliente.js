"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "clientes",
            [
                {
                    cedula: "20.100.055",
                    nombre: "Karpesky",
                    direccion: "Brooklyn 1020 Av",
                    fecha_nacimiento: new Date(),
                    telefono: "04264558990",
                    email: "karp@hey.com",
                },
                {
                    cedula: "15.677.254",
                    nombre: "Cisco",
                    direccion: "Dallas 345 Av",
                    fecha_nacimiento: new Date(),
                    telefono: "04261009090",
                    email: "dallas@hey.com",
                },
                {
                    cedula: "30.359.888",
                    nombre: "Memset",
                    direccion: "Blitz 400",
                    fecha_nacimiento: new Date(),
                    telefono: "04125001048",
                    email: "memset@outlook.com",
                },
                {
                    cedula: "8.865.140",
                    nombre: "July",
                    direccion: "CC Tone",
                    fecha_nacimiento: new Date(),
                    telefono: "04246993322",
                    email: "July@gmail.com",
                },
                {
                    cedula: "7.944.529",
                    nombre: "John Doe",
                    direccion: "Store Av",
                    fecha_nacimiento: new Date(),
                    telefono: "04121005090",
                    email: "john@outlook.com",
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("clientes", null, {});
    },
};
