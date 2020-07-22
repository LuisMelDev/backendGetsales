"use strict";
module.exports = (sequelize, DataTypes) => {
    const Grupo = sequelize.define(
        "grupos",
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
    Grupo.associate = function (models) {
        Grupo.hasMany(models.productos, {
            foreignKey: "grupo_id",
            as: "Productos",
        });
    };
    return Grupo;
};
