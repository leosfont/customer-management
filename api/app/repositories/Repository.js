class Repository {
    constructor() {
        this.model = {};
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findAll() {
        return await this.model.findAll();
    }

    async paginate(filters = {}, page, perPage) {
        return await this.model.paginate(filters,  page, perPage);
    }
    
    async create(params = {}) {
        return await this.model.create(params)
    }

    async update(id, params) {
        return await this.model.update(id, params);
    }

    async delete(id) {
        return await this.model.delete(id);
    }
}

export default Repository;
