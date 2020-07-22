const BaseRepository = require("./base.repository");
let _compra = null;
let _detalleCompra = null;
let _proveedor = null;
let _usuario = null;

class CompraRepository extends BaseRepository {
    constructor({ Compra, DetalleCompra, Proveedor, Usuario }) {
        super(Compra);
        _compra = Compra;
        _detalleCompra = DetalleCompra;
        _proveedor = Proveedor;
        _usuario = Usuario;
    }

    async get(compraId) {
        return await _compra.findByPk(compraId, {
            include: [
                {
                    model: _detalleCompra,
                    foreignKey: "compra_id",
                    as: "detalles",
                },
                {
                    model: _usuario,
                    as: "usuario",
                    foreignKey: "usuario_id",
                },
                {
                    model: _proveedor,
                    foreignKey: "proveedor_id",
                    as: "proveedor",
                },
            ],
        });
    }

    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        // Check if sort key is an actual attribute of model
        if (!this.validSort(_compra, sortBy)) {
            return [];
        }
        if (!limitResults || !pageNum) {
            return await _compra.findAll({
                include: [
                    {
                        model: _detalleCompra,
                        foreignKey: "compra_id",
                        as: "detalles",
                    },
                    {
                        model: _usuario,
                        as: "usuario",
                        foreignKey: "usuario_id",
                    },
                    {
                        model: _proveedor,
                        foreignKey: "proveedor_id",
                        as: "proveedor",
                    },
                ],
                order: [[sortBy, orderBy]],
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _compra.findAll({
            limit,
            offset: (page - 1) * limit,
            include: [
                {
                    model: _detalleCompra,
                    foreignKey: "compra_id",
                    as: "detalles",
                },
                {
                    model: _usuario,
                    as: "usuario",
                    foreignKey: "usuario_id",
                },
                {
                    model: _proveedor,
                    foreignKey: "proveedor_id",
                    as: "proveedor",
                },
            ],
            order: [[sortBy, orderBy]],
        });
        const count = await _compra.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }
    async createDetalles(detalles) {
        return await _detalleCompra.bulkCreate(detalles);
    }

    async getByFecha(options) {
        return await _compra.findAll({
            include: [
                {
                    model: _detalleCompra,
                    foreignKey: "compra_id",
                    as: "detalles",
                },
                {
                    model: _usuario,
                    as: "usuario",
                    foreignKey: "usuario_id",
                },
                {
                    model: _proveedor,
                    foreignKey: "proveedor_id",
                    as: "proveedor",
                },
            ],
            where: { ...options },
        });
    }
    async searchAll(options) {
        return await this.model.findAll({
            include: [
                {
                    model: _detalleCompra,
                    foreignKey: "compra_id",
                    as: "detalles",
                },
                {
                    model: _usuario,
                    foreignKey: "usuario_id",
                    as: "usuario",
                },
                {
                    model: _proveedor,
                    foreignKey: "proveedor_id",
                    as: "proveedor",
                    ...options,
                },
            ],
        });
    }
}

module.exports = CompraRepository;
