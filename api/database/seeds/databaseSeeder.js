import CustomerFactory from '../factories/CustomerFactory.js';

async function databaseSeeder() {
  const customerFactory = new CustomerFactory();
  await customerFactory.create(10);
}

databaseSeeder();
