"use strict";
module.exports = (sequelize, DataTypes) => {
    const DetalleCompra = sequelize.define(
        "detalle_compras",
        {
            compra_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            producto_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cantidad_producto: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            precio_producto: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
    DetalleCompra.associate = function (models) {
        DetalleCompra.belongsTo(models.compras, {
            foreignKey: "compra_id",
            as: "compra",
        });
        DetalleCompra.belongsTo(models.productos, {
            foreignKey: "producto_id",
            as: "producto",
        });
    };
    DetalleCompra.afterBulkCreate(async (detalles, options) => {
        detalles.forEach(async (detalleCompra) => {
            const inventario = await sequelize.models.inventarios.findByPk(
                detalleCompra.producto_id
            );
            return await inventario.increment("existencia_producto", {
                by: detalleCompra.cantidad_producto,
            });
        });
    });
    return DetalleCompra;
};
