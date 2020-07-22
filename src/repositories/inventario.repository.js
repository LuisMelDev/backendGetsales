const BaseRepository = require("./base.repository");
let _inventario = null;
let _producto = null;
let _marca = null;
let _grupo = null;
let _amperaje = null;

class InventarioRepository extends BaseRepository {
    constructor({ Inventario, Producto, Marca, Grupo, Amperaje }) {
        super(Inventario);
        _inventario = Inventario;
        _producto = Producto;
        _marca = Marca;
        _grupo = Grupo;
        _amperaje = Amperaje;
    }

    async get(productoId) {
        return await _inventario.findByPk(productoId, {
            include: [
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
    async getAll(
        limitResults,
        pageNum,
        sortBy = "fecha_entrada",
        orderBy = "desc"
    ) {
        const includeParams = [
            {
                model: _producto,
                as: "producto",
                include: [
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
            },
        ];
        let order;
        if (sortBy === "marca") {
            order = [["producto", "marca", "nombre", orderBy]];
        } else if (sortBy === "grupo") {
            order = [["producto", "grupo", "nombre", orderBy]];
        } else if (sortBy === "amperaje") {
            order = [["producto", "amperaje", "amp", orderBy]];
        } else if (sortBy === "nombre") {
            order = [["producto", "nombre", orderBy]];
        } else if (sortBy === "id") {
            order = [["producto", "id", orderBy]];
        } else {
            // Check if sort key is an actual attribute of model
            if (!this.validSort(_inventario, sortBy)) {
                return [];
            }
            order = [[sortBy, orderBy]];
        }
        if (!limitResults || !pageNum) {
            return await _inventario.findAll({
                include: includeParams,
                order,
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _inventario.findAll({
            limit,
            offset: (page - 1) * limit,
            include: includeParams,
            order,
        });
        const count = await _inventario.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }

    async getByFecha(fecha_entrada) {
        return await _inventario.findAll({
            where: {
                fecha_entrada,
            },
        });
    }
    async stock(productoId) {
        const producto = await _inventario.findByPk(productoId);
        return producto.existencia_producto;
    }
}
module.exports = InventarioRepository;
