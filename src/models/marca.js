"use strict";
module.exports = (sequelize, DataTypes) => {
    const Marca = sequelize.define(
        "marcas",
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            timestamps: false,
        }
    );
    Marca.associate = function (models) {
        Marca.hasMany(models.productos, {
            foreignKey: "marca_id",
            as: "Productos",
        });
    };
    return Marca;
};
