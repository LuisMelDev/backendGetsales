"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "productos",
            [
                {
                    nombre: "Battery ONE",
                    imagen: "someurl.com",
                    amperaje_id: Math.floor(Math.random() * 5) + 1,
                    marca_id: Math.floor(Math.random() * 5) + 1,
                    grupo_id: Math.floor(Math.random() * 5) + 1,
                },
                {
                    nombre: "Battery TWO",
                    imagen: "someurl2.com",
                    amperaje_id: Math.floor(Math.random() * 5) + 1,
                    marca_id: Math.floor(Math.random() * 5) + 1,
                    grupo_id: Math.floor(Math.random() * 5) + 1,
                },
                {
                    nombre: "Battery THREE",
                    imagen: "someurl2.com",
                    amperaje_id: Math.floor(Math.random() * 5) + 1,
                    marca_id: Math.floor(Math.random() * 5) + 1,
                    grupo_id: Math.floor(Math.random() * 5) + 1,
                },
                {
                    nombre: "Battery FOUR",
                    imagen: "someurl2.com",
                    amperaje_id: Math.floor(Math.random() * 5) + 1,
                    marca_id: Math.floor(Math.random() * 5) + 1,
                    grupo_id: Math.floor(Math.random() * 5) + 1,
                },
                {
                    nombre: "Battery FIVE",
                    imagen: "someurl2.com",
                    amperaje_id: Math.floor(Math.random() * 5) + 1,
                    marca_id: Math.floor(Math.random() * 5) + 1,
                    grupo_id: Math.floor(Math.random() * 5) + 1,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("productos", null, {});
    },
};
