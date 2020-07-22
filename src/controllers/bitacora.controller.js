let _bitacoraService = null;

class BitacoraController {
    constructor({ BitacoraService }) {
        _bitacoraService = BitacoraService;
    }
    async get(req, res, next) {
        const { id } = req.params;
        try {
            const bitacora = await _bitacoraService.get(id);
            return res.send(bitacora);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getAll(req, res, next) {
        const { limit, page, sort_by, order_by } = req.query;
        try {
            const bitacoras = await _bitacoraService.getAll(
                limit,
                page,
                sort_by,
                order_by
            );
            return res.send(bitacoras);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = BitacoraController;
