"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "roles",
            [
                {
                    rol: "Administrador",
                },
                {
                    rol: "Empleado",
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("roles", null, {});
    },
};
