import db from '../../config/database.js';

class PostgresDriver {
    constructor() {
        this.db = db;
        this.table = 'none';
        this.filters = [];
    }

    async findById(id) {
        try {
            const result = await this.run(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);    
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            return null;
        }
    }

    async findAll() {
        const query = `SELECT * FROM ${this.table}`;
        return await this.run(query);
    }

    async paginate(filters = {}, page = 1, perPage = 20) {
        try {
            const offset = (parseInt(page) - 1) * parseInt(perPage);

            const filterClauses = Object.entries(filters).map(([key, _value], loop) => {
                if (this.filterable.includes(key)) {
                    return `${key} ILIKE '%' || $${loop + 1} || '%'`;
                }
                return null;
            }).filter(filter => filter !== null);

            const whereClause = filterClauses.length > 0 ? ` WHERE ${filterClauses.join(' AND ')}` : '';

            const [data, total] = await Promise.all([
                this.run(`
                    SELECT * FROM "${this.table}"${whereClause}
                    ORDER BY id DESC
                    OFFSET $${filterClauses.length + 1}
                    LIMIT $${filterClauses.length + 2}`,
                    [...Object.values(filters), offset, perPage]
                ),
                this.run(`SELECT COUNT(*) FROM "${this.table}" ${whereClause}`, [...Object.values(filters)])
            ]);

            const totalPages = Math.ceil(total[0].count / parseInt(perPage));
            return {
                data,
                page: parseInt(page),
                perPage,
                total: parseInt(total[0].count),
                totalPages,
            };
        } catch (error) {
            return {
                data: [],
                page: parseInt(page),
                perPage,
                total: 0,
                totalPage: 0,
            }    
        }
    }
    
    async create(values = {}) {
        const result = await this.run(`INSERT INTO ${this.table} ($1:name) VALUES($1:csv) RETURNING *`, [values]);
        return result.length > 0 ? result[0] : result;
    }

    async update(id, values = {}) {
        const setClause = Object.keys(values)
            .filter(key => key !== 'id' && this.fillable.includes(key))
            .map((key, index) => `"${key}" = $${index + 2}`)
            .join(', ');
    
        const updateQuery = `
            UPDATE ${this.table}
            SET ${setClause}
            WHERE id = $1
            RETURNING *;`;
    
        const result = await this.run(updateQuery, [id, ...Object.values(values)]);
        return result.length > 0 ? result[0] : result;
    }

    async delete(id) {
        const deleteQuery = `
            DELETE FROM ${this.table}
            WHERE id = $1
            RETURNING *;`;
    
        return this.run(deleteQuery, [id]);
    }

    async run(query, params) {
        try {
            return await this.db.query(query, params);
        } catch (error) {
            throw new Error(`Erro ao executar a consulta: ${error.message}`);
        }
    }
}

export default PostgresDriver;
