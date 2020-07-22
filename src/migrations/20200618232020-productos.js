"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.resolve(
            queryInterface.createTable("productos", {
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
                imagen: {
                    type: Sequelize.STRING,
                },
                amperaje_id: {
                    type: Sequelize.INTEGER,
                    references: { model: "amperajes", key: "id" },
                },
                grupo_id: {
                    type: Sequelize.INTEGER,
                    references: { model: "grupos", key: "id" },
                },
                marca_id: {
                    type: Sequelize.INTEGER,
                    references: { model: "marcas", key: "id" },
                },
            })
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("productos");
    },
};
