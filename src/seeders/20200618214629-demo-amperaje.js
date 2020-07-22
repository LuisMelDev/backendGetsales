"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "amperajes",
            [
                {
                    amp: "10",
                },
                {
                    amp: "4",
                },
                {
                    amp: "9",
                },
                {
                    amp: "6",
                },
                {
                    amp: "3",
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("amperajes", null, {});
    },
};
