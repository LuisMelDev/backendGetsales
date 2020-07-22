const { ErrorHelper } = require("../helpers");
//clase de de servicio base para operaciones crud basicas
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async find(parameter) {
        if (!parameter) {
            ErrorHelper(400, "field must be sent");
        }
        return await this.repository.find(parameter);
    }

    async get(id) {
        if (!id) {
            ErrorHelper(400, "id must be sent");
        }

        const currentEntity = await this.repository.get(id);

        if (!currentEntity) {
            ErrorHelper(404, "entitys does not found");
        }

        return currentEntity;
    }

    async getAll(limitResults, pageNum, sortedBy, orderBy) {
        return await this.repository.getAll(
            limitResults,
            pageNum,
            sortedBy,
            orderBy
        );
    }

    async create(entity) {
        return await this.repository.create(entity);
    }

    async update(id, entity) {
        if (!id || !entity) {
            ErrorHelper(400, "id or entity must be sent");
        }

        return await this.repository.update(id, entity);
    }

    async delete(id) {
        if (!id) {
            ErrorHelper(400, "id must be sent");
        }

        return await this.repository.delete(id);
    }

    async searchAll(options) {
        return await this.repository.searchAll(options);
    }
}

module.exports = BaseService;
