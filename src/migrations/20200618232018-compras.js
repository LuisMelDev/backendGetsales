"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("compras", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            proveedor_id: {
                type: Sequelize.INTEGER,
                references: { model: "proveedores", key: "id" },
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
        return queryInterface.dropTable("compras");
    },
};
