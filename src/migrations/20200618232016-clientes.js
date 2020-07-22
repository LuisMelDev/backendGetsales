"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("clientes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cedula: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            direccion: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            fecha_nacimiento: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            telefono: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("clientes");
    },
};
