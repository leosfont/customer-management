import Repository from "./Repository.js";
import Customer from "../models/Customer.js";

class CustomerRepository extends Repository {
    constructor() {
        super();
        this.model = new Customer();
    }
}

export default CustomerRepository;
