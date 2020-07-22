"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("operaciones", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            operacion: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("operaciones");
    },
};
