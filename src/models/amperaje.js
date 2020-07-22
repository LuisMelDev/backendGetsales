"use strict";
module.exports = (sequelize, DataTypes) => {
    const Amperaje = sequelize.define(
        "amperajes",
        {
            amp: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
    Amperaje.associate = function (models) {
        Amperaje.hasMany(models.productos, {
            foreignKey: "amperaje_id",
            as: "productos",
        });
    };
    return Amperaje;
};
