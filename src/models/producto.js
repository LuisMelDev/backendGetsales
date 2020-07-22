"use strict";
module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define(
        "productos",
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imagen: {
                type: DataTypes.STRING
            },
            amperaje_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            grupo_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            marca_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
    Producto.associate = function (models) {
        Producto.belongsTo(models.amperajes, {
            foreignKey: "amperaje_id",
            as: "amperaje",
        });
        Producto.belongsTo(models.grupos, {
            foreignKey: "grupo_id",
            as: "grupo",
        });
        Producto.belongsTo(models.marcas, {
            foreignKey: "marca_id",
            as: "marca",
        });

        Producto.hasOne(models.inventarios, {
            foreignKey: "producto_id",
            as: "inventario",
        });
    };

    Producto.afterCreate(async (producto, options) => {
        return await sequelize.models.inventarios.create({
            producto_id: producto.id,
            fecha_entrada: Date.now(),
            existencia_producto: 0,
        });
    });
    Producto.afterDestroy(async (producto, options) => {
        const inventarioProducto = await sequelize.models.inventarios.findByPk(
            producto.id
        );
        return await inventarioProducto.destroy();
    });
    return Producto;
};
