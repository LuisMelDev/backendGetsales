const BaseService = require("./base.service");
let _amperajeRepository = null;

class AmperajeService extends BaseService {
    constructor({ AmperajeRepository }) {
        super(AmperajeRepository);
        _amperajeRepository = AmperajeRepository;
    }
    async getProductos(amperajeId) {
        return await _amperajeRepository.getProductos(amperajeId);
    }
}

module.exports = AmperajeService;
