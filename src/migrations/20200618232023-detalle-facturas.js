"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("detalle_facturas", {
            factura_id: {
                type: Sequelize.INTEGER,
                references: { model: "facturas", key: "id" },
                onUpdate: "CASCADE",
            },
            producto_id: {
                type: Sequelize.INTEGER,
                references: { model: "productos", key: "id" },
                onUpdate: "CASCADE",
            },
            cantidad_producto: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            precio_producto: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("detalle_facturas");
    },
};
