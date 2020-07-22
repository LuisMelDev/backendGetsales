const BaseRepository = require("./base.repository");
let _factura = null;
let _detalleFactura = null;
let _cliente = null;
let _usuario = null;

class FacturaRepository extends BaseRepository {
    constructor({ Factura, DetalleFactura, Cliente, Usuario }) {
        super(Factura);
        _factura = Factura;
        _detalleFactura = DetalleFactura;
        _cliente = Cliente;
        _usuario = Usuario;
    }
    async get(facturaId) {
        return await _factura.findByPk(facturaId, {
            include: [
                {
                    model: _detalleFactura,
                    foreignKey: "factura_id",
                    as: "detalles",
                },
                {
                    model: _usuario,
                    as: "usuario",
                    foreignKey: "usuario_id",
                },
                {
                    model: _cliente,
                    foreignKey: "cliente_id",
                    as: "cliente",
                },
            ],
        });
    }
    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        // Check if sort key is an actual attribute of model
        if (!this.validSort(_factura, sortBy)) {
            return [];
        }
        if (!limitResults || !pageNum) {
            return await _factura.findAll({
                include: [
                    {
                        model: _detalleFactura,
                        as: "detalles",
                        foreignKey: "factura_id",
                    },
                    {
                        model: _usuario,
                        as: "usuario",
                        foreignKey: "usuario_id",
                    },
                    {
                        model: _cliente,
                        as: "cliente",
                        foreignKey: "cliente_id",
                    },
                ],
                order: [[sortBy, orderBy]],
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _factura.findAll({
            limit,
            offset: (page - 1) * limit,
            include: [
                {
                    model: _detalleFactura,
                    foreignKey: "factura_id",
                    as: "detalles",
                },
                {
                    model: _usuario,
                    as: "usuario",
                    foreignKey: "usuario_id",
                },
                {
                    model: _cliente,
                    as: "cliente",
                    foreignKey: "cliente_id",
                },
            ],
            order: [[sortBy, orderBy]],
        });
        const count = await _factura.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }

    async createDetalles(detalles) {
        return await _detalleFactura.bulkCreate(detalles);
    }

    async getByFecha(options) {
        return await _factura.findAll({
            include: [
                {
                    model: _detalleFactura,
                    foreignKey: "factura_id",
                    as: "detalles",
                },
                {
                    model: _usuario,
                    as: "usuario",
                    foreignKey: "usuario_id",
                },
                {
                    model: _cliente,
                    as: "cliente",
                    foreignKey: "cliente_id",
                },
            ],
            where: {
                ...options,
            },
        });
    }
    async searchAll(options) {
        return await this.model.findAll({
            include: [
                {
                    model: _detalleFactura,
                    foreignKey: "factura_id",
                    as: "detalles",
                },
                {
                    model: _usuario,
                    foreignKey: "usuario_id",
                    as: "usuario",
                },
                {
                    model: _cliente,
                    foreignKey: "cliente_id",
                    as: "cliente",
                    ...options,
                },
            ],
        });
    }
}

module.exports = FacturaRepository;
