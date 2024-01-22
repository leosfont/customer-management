import Service from "./Service.js";
import CustomerRepository from "../repositories/CustomerRepository.js";
import TravellingSalesmanSolverHelper from "../helpers/TravellingSalesmanSolverHelper.js";

class CustomerService extends Service {
    constructor() {
        super();
        this.repository = new CustomerRepository();
    }

    async optimizedRoute() {
        const customers = await this.repository.findAll();
        
        customers.unshift({
            id: 0,
            coordinate_x: 0,
            coordinate_y: 0
        });
        const tspSolver = new TravellingSalesmanSolverHelper(customers);
        return tspSolver.solveTSP();
    }
}

export default CustomerService;
