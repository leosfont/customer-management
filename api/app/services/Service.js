class Service {
    constructor() {
        this.repository = {};
    }

    async findById(id) {
        return await this.repository.findById(id);
    }

    async findAll() {
        return await this.repository.findAll();
    }

    async paginate(filters = {}, page = 1, perPage = 20) {
        return await this.repository.paginate(filters, page, perPage);
    }
    
    async create(params = {}) {
        return await this.repository.create(params)
    }

    async update(id, params) {
        return await this.repository.update(id, params);
    }

    async delete(id) {
        return await this.repository.delete(id);
    }
}

export default Service;
