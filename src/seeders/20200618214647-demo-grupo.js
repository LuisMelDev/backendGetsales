"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "grupos",
            [
                {
                    nombre: "Group one",
                },
                {
                    nombre: "Group two",
                },
                {
                    nombre: "Group three",
                },
                {
                    nombre: "Group four",
                },
                {
                    nombre: "Group five",
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("grupos", null, {});
    },
};
