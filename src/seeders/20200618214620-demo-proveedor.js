"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "proveedores",
            [
                {
                    nombre: "Titanium",
                    rif: "RIF-012345JG",
                },
                {
                    nombre: "Metal Gear",
                    rif: "RIF-S01234JG",
                },

                {
                    nombre: "Hattori Hanzo",
                    rif: "RIF-DXXXXXJG",
                },
                {
                    nombre: "Lewis C.A.",
                    rif: "RIF-FZZZZZJG",
                },
                {
                    nombre: "Electroniks",
                    rif: "RIF-GCCCCCJG",
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("proveedores", null, {});
    },
};
