"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "operaciones",
            [
                {
                    operacion: "CREATE",
                },
                {
                    operacion: "UPDATE",
                },
                {
                    operacion: "DELETE",
                },
                {
                    operacion: "REGISTER",
                },
                {
                    operacion: "LOGIN",
                },
                {
                    operacion: "LOGOUT",
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("operaciones", null, {});
    },
};
