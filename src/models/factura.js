"use strict";
module.exports = (sequelize, DataTypes) => {
    const Factura = sequelize.define(
        "facturas",
        {
            cliente_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: false,
        }
    );
    Factura.associate = function (models) {
        Factura.belongsTo(models.clientes, {
            foreignKey: "cliente_id",
            as: "cliente",
        });
        Factura.belongsTo(models.usuarios, {
            foreignKey: "usuario_id",
            as: "usuario",
        });
        Factura.belongsToMany(models.inventarios, {
            through: models.detalle_facturas,
            foreignKey: "factura_id",
            as: "productos",
        });
        Factura.hasMany(models.detalle_facturas, {
            foreignKey: "factura_id",
            as: "detalles",
        });
    };
    return Factura;
};
