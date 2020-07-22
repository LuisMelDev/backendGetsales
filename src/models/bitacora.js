"use strict";
module.exports = (sequelize, DataTypes) => {
    const Bitacora = sequelize.define(
        "bitacora",
        {
            fecha: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                primaryKey: true,
            },
            operacion_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
            },
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    Bitacora.associate = function (models) {
        Bitacora.belongsTo(models.operaciones, {
            foreignKey: "operacion_id",
            as: "operacion",
        });
        Bitacora.belongsTo(models.usuarios, {
            foreignKey: "usuario_id",
            as: "usuario",
        });
    };
    return Bitacora;
};
