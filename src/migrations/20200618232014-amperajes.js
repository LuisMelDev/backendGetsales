"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("amperajes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            amp: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("amperajes");
    },
};
