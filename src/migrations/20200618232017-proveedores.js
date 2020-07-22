"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("proveedores", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            rif: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("proveedores");
    },
};
