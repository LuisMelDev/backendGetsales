class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async get(id) {
        return await this.model.findByPk(id);
    }

    async create(entity) {
        return await this.model.create(entity);
    }

    async update(id, entity) {
        return this.model.update(entity, {
            where: {
                id: id,
            },
        });
    }

    async delete(id) {
        await this.model.destroy({
            where: {
                id,
            },
        });

        return true;
    }
    async searchAll(options) {
        return await this.model.findAll(options);
    }

    getPaginate(limit, page, count) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalPages = Math.ceil(count / limit);
        const paginationData = {};
        if (endIndex < count) {
            paginationData.next = {
                page: page + 1,
                limit,
            };
        }
        if (startIndex > 0) {
            paginationData.previous = {
                page: page - 1,
                limit,
            };
        }
        if (page > 1) {
            paginationData.first = {
                page: 1,
                limit,
            };
        }
        if (page != totalPages) {
            paginationData.last = {
                page: totalPages,
                limit,
            };
        }
        paginationData.totalPages = totalPages;
        return paginationData;
    }

    validSort(model, sortKey) {
        return model.rawAttributes.hasOwnProperty(sortKey);
    }
}

module.exports = BaseRepository;
