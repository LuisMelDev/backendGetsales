"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("inventarios", {
            producto_id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: { model: "productos", key: "id" },
                onUpdate: "CASCADE",
            },
            existencia_producto: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            fecha_entrada: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("inventarios");
    },
};
