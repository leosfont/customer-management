import { faker } from '@faker-js/faker';
import Customer from '../../app/models/Customer.js';

class CustomerFactory {
    async definition(params = {}) {
        const fields = {
            name: params.name || faker.person.firstName(),
            email: params.email || faker.internet.email(),
            phone: params.phone || faker.phone.number(),
            coordinate_x: params.coordinate_x || faker.location.latitude(),
            coordinate_y: params.coordinate_y || faker.location.longitude(),
        };
        const customer = new Customer();
        return await customer.create(fields);
    }

    create(count = 1, params = {}) {
        const customers = faker.helpers.multiple(async () => await this.definition(params), { count });
        return customers.length == 1 ? customers[0] : customers;
    }
}

export default CustomerFactory;