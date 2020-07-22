"use strict";
module.exports = (sequelize, DataTypes) => {
    const Operacion = sequelize.define(
        "operaciones",
        {
            operacion: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            timestamps: false,
        }
    );
    Operacion.associate = function (models) {
        Operacion.belongsToMany(models.usuarios, {
            through: models.bitacora,
            as: "usuarios",
            foreignKey: "operacion_id",
        });
        Operacion.hasMany(models.bitacora, {
            foreignKey: "operacion_id",
            as: "bitacoras",
        });
    };
    return Operacion;
};
