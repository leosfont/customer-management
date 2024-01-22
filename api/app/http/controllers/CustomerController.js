import CustomerService from '../../services/CustomerService.js';

class CustomerController {
    constructor() {
        this.customerService = new CustomerService();
    }

    async findById(req, res) {
        const customerId = req.params.id;
        const customer = await this.customerService.findById(customerId);
    
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    }

    async paginate(req, res) {
        const {page, perPage, ...filters} = req.query;
        const customers = await this.customerService.paginate(filters, page, perPage);
        res.json(customers);
    }

    async create(req, res) {
        const { name, email, phone, coordinate_x, coordinate_y } = req.body;
        try {
            const createdCustomer = await this.customerService.create({ name, email, phone, coordinate_x, coordinate_y });
            res.status(201).json(createdCustomer);
        } catch (error) {
            console.error('Error creating customer:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req, res) {
        const customerId = req.params.id;
        const updatedData = req.body;
        try {
            const updatedCustomer = await this.customerService.update(customerId, updatedData);
            if (updatedCustomer) {
                res.json(updatedCustomer);
            } else {
                res.status(404).json({ error: 'Customer not found' });
            }
        } catch (error) {
            console.error('Error updating customer:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req, res) {
        const customerId = req.params.id;
        try {
            const result = await this.customerService.delete(customerId);
            if (result) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'Customer not found' });
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async optimizedRoute(_, res) {
        try {
            const customers = await this.customerService.optimizedRoute();
            res.json(customers);
        } catch (error) {
            console.error('Error find best route by company location:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default CustomerController;
