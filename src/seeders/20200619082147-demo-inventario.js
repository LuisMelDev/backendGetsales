"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "inventarios",
            [
                {
                    producto_id: "1",
                    existencia_producto: "0",
                    fecha_entrada: new Date(),
                },
                {
                    producto_id: "2",
                    existencia_producto: "0",
                    fecha_entrada: new Date(),
                },
                {
                    producto_id: "3",
                    existencia_producto: "0",
                    fecha_entrada: new Date(),
                },
                {
                    producto_id: "4",
                    existencia_producto: "0",
                    fecha_entrada: new Date(),
                },
                {
                    producto_id: "5",
                    existencia_producto: "0",
                    fecha_entrada: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("inventarios", null, {});
    },
};
