const BaseService = require("./base.service");
let _operacionRepository = null;

class OperacionService extends BaseService {
    constructor({ OperacionRepository }) {
        super(OperacionRepository);
        _operacionRepository = OperacionRepository;
    }
}

module.exports = OperacionService;
