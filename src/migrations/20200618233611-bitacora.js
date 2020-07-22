"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("bitacora", {
            fecha: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
                primaryKey: true,
            },
            operacion_id: {
                type: Sequelize.INTEGER,
                references: { model: "operaciones", key: "id" },
                primaryKey: true,
            },
            descripcion: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            usuario_id: {
                type: Sequelize.INTEGER,
                references: { model: "usuarios", key: "id" },
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("bitacora");
    },
};
