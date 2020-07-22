"use strict";
module.exports = (sequelize, DataTypes) => {
    const Inventario = sequelize.define(
        "inventarios",
        {
            producto_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            fecha_entrada: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            existencia_producto: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
    Inventario.associate = function (models) {
        Inventario.belongsTo(models.productos, {
            foreignKey: "producto_id",
            as: "producto",
        });
        Inventario.belongsToMany(models.facturas, {
            through: models.detalle_facturas,
            foreignKey: "producto_id",
            as: "facturas",
        });

        Inventario.belongsToMany(models.compras, {
            through: models.detalle_compras,
            foreignKey: "producto_id",
            as: "compras",
        });
    };
    return Inventario;
};
