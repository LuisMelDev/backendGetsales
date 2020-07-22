"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "marcas",
            [
                {
                    nombre: "Ultimate",
                },
                {
                    nombre: "Tesla",
                },
                {
                    nombre: "Samsung",
                },
                {
                    nombre: "Silver",
                },
                {
                    nombre: "Bogaloo Socialista",
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("marcas", null, {});
    },
};
