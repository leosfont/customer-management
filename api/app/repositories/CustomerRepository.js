import Repository from "./Repository.js";
import Customer from "../models/Customer.js";
import db from "../../config/database.js";

class CustomerRepository extends Repository {
    constructor() {
        super();
        this.model = new Customer();
    }

    async optimizedRoute() {
        try {
          const result = await db.query(`
            SELECT
              seq,
              id AS customer_id,
              name,
              email,
              phone,
              coordinate_x,
              coordinate_y
            FROM
              pgr_tsp(
                'SELECT id, coordinate_x, coordinate_y FROM customers', -- table nodes
                1 -- node origin
              ) AS route
            JOIN
              customers ON route.id = customers.id
            ORDER BY
              seq;
          `);
      
          return result;
        } catch (error) {
          console.error(error);
          return [];
        }
    }
}

export default CustomerRepository;
