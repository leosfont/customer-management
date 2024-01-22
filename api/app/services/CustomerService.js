import Service from "./Service.js";
import CustomerRepository from "../repositories/CustomerRepository.js";

class CustomerService extends Service {
    constructor() {
        super();
        this.repository = new CustomerRepository();
    }

    async optimizedRoute() {
        return await this.repository.optimizedRoute()
    }
}

export default CustomerService;
