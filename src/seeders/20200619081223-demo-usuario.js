"use strict";
const { hash } = require("bcryptjs");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "usuarios",
            [
                {
                    rol_id: "1",
                    nombre: "Get Sales",
                    username: "getsales",
                    password: await hash("getsales", 12),
                    email: "getsales@hey.com",
                },
                {
                    rol_id: "2",
                    nombre: "Empleado",
                    username: "empleado",
                    password: await hash("empleado", 12),
                    email: "empleado@hey.com",
                },
                {
                    rol_id: "2",
                    nombre: "Empleado2",
                    username: "empleado2",
                    password: await hash("empleado2", 12),
                    email: "empleado2@gmail.com",
                },
                {
                    rol_id: "2",
                    nombre: "Empleado3",
                    username: "empleado3",
                    password: await hash("empleado3", 12),
                    email: "empleado3@outlook.com",
                },
                {
                    rol_id: "2",
                    nombre: "Empleado4",
                    username: "empleado4",
                    password: await hash("empleado4", 12),
                    email: "empleado4@yahoo.com",
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("usuarios", null, {});
    },
};
