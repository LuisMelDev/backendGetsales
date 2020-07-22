"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("facturas", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cliente_id: {
                type: Sequelize.INTEGER,
                references: { model: "clientes", key: "id" },
            },
            usuario_id: {
                type: Sequelize.INTEGER,
                references: { model: "usuarios", key: "id" },
            },
            fecha: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("facturas");
    },
};
