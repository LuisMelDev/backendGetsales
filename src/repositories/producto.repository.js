const BaseRepository = require("./base.repository");
let _producto = null;
let _marca = null;
let _grupo = null;
let _amperaje = null;
let _inventario = null;

class ProductoRepository extends BaseRepository {
    constructor({ Producto, Marca, Grupo, Amperaje, Inventario }) {
        super(Producto);
        _producto = Producto;
        _marca = Marca;
        _grupo = Grupo;
        _amperaje = Amperaje;
        _inventario = Inventario;
    }

    async get(productoId) {
        return await _producto.findByPk(productoId, {
            include: [
                {
                    model: _inventario,
                    as: "inventario",
                },
                {
                    model: _marca,
                    as: "marca",
                },
                {
                    model: _grupo,
                    as: "grupo",
                },
                {
                    model: _amperaje,
                    as: "amperaje",
                },
            ],
        });
    }

    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        let order;
        if (sortBy === "marca") {
            order = [["marca", "nombre", orderBy]];
        } else if (sortBy === "grupo") {
            order = [["grupo", "nombre", orderBy]];
        } else if (sortBy === "amperaje") {
            order = [["amperaje", "amp", orderBy]];
        } else {
            // Check if sort key is an actual attribute of model
            if (
                !this.validSort(_producto, sortBy) &&
                !this.validSort(_marca, sortBy) &&
                !this.validSort(_grupo, sortBy) &&
                !this.validSort(_amperaje, sortBy)
            ) {
                return [];
            }
            order = [[sortBy, orderBy]];
        }
        if (!limitResults || !pageNum) {
            return await _producto.findAll({
                include: [
                    {
                        model: _inventario,
                        as: "inventario",
                    },
                    {
                        model: _marca,
                        as: "marca",
                    },
                    {
                        model: _grupo,
                        as: "grupo",
                    },
                    {
                        model: _amperaje,
                        as: "amperaje",
                    },
                ],
                order,
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _producto.findAll({
            limit,
            offset: (page - 1) * limit,
            include: [
                {
                    model: _inventario,
                    as: "inventario",
                },
                {
                    model: _marca,
                    as: "marca",
                },
                {
                    model: _grupo,
                    as: "grupo",
                },
                {
                    model: _amperaje,
                    as: "amperaje",
                },
            ],
            order,
        });
        const count = await _producto.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }

    async getProductoByNombre(nombre) {
        return await _producto.findAll({
            where: {
                nombre,
            },
        });
    }

    async searchAll(options) {
        const optionsEager = {
            ...options,
            include: [
                {
                    model: _inventario,
                    as: "inventario",
                },
                {
                    model: _marca,
                    as: "marca",
                },
                {
                    model: _grupo,
                    as: "grupo",
                },
                {
                    model: _amperaje,
                    as: "amperaje",
                },
            ],
        };
        return await this.model.findAll(optionsEager);
    }
}

module.exports = ProductoRepository;
