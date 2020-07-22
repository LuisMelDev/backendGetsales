"use strict";
module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define(
        "clientes",
        {
            cedula: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            direccion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha_nacimiento: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            telefono: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
    Cliente.associate = function (models) {
        Cliente.hasMany(models.facturas, {
            foreignKey: "cliente_id",
            as: "Facturas",
        });
    };
    return Cliente;
};
