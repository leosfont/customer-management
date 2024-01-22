import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import { execSync } from 'child_process';
import CustomerFactory from '../database/factories/CustomerFactory.js';

describe('Customer API', () => {
    let customers = [];
    let filterCustomer = {};

    before(async () => {
        execSync('npx migrate down --migrations-dir database/migrations', { stdio: 'inherit' });
        execSync('npx migrate up --migrations-dir database/migrations', { stdio: 'inherit' });
        const factory = new CustomerFactory();
        customers = await factory.create(40);
        filterCustomer = await factory.create(1, {
            name: 'filtername123',
            email: 'filteremail123@mail.com',
            phone: 'filterphone123',
            coordinate_x: -35.3483,
            coordinate_y: 15.3483,
        });
    });

    it('should get a specific customer by ID', async () => {
        const response = await request(app).get(`/customers/${filterCustomer.id}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('id').to.equal(filterCustomer.id);
    });

    it('should return 404 for non-existing customer ID', async () => {
        const response = await request(app).get(`/customers/nonExistingId`);
        expect(response.status).to.equal(404);
    });

    it('should get a list of customers without filters', async () => {
        const response = await request(app).get('/customers');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('data').to.be.an('array');
        expect(response.body.data).to.have.lengthOf(20);
    });

    it('should filter customers by name', async () => {
        const response = await request(app).get('/customers?name=filtername123');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('data').to.be.an('array');
        expect(response.body.data.every(customer => customer.name === 'filtername123')).to.be.true;
    });

    it('should filter customers by email', async () => {
        const response = await request(app).get('/customers?email=filteremail123@gmail.com');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('data').to.be.an('array');
        expect(response.body.data.every(customer => customer.email === 'filteremail123@gmail.com')).to.be.true;
    });

    it('should filter customers by phone', async () => {
        const response = await request(app).get('/customers?phone=filterphone123');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('data').to.be.an('array');
        expect(response.body.data.every(customer => customer.phone === 'filterphone123')).to.be.true;
    });

    it('should create a new customer', async () => {
        const newCustomerData = {
            name: 'New Customer',
            email: 'newcustomer@mail.com',
            phone: '123456789',
            coordinate_x: 15.3483,
            coordinate_y: 165.3483,
        };
        const response = await request(app)
            .post('/customers')
            .send(newCustomerData);
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
        expect(response.body).to.deep.include(newCustomerData);
    });

    it('should update an existing customer', async () => {
        const updatedData = {
            name: 'Updated Name',
            email: 'updatedemail@mail.com',
            phone: '987654321',
            coordinate_x: 15.3483,
            coordinate_y: 165.3483,
        };
        const response = await request(app)
            .put(`/customers/${filterCustomer.id}`)
            .send(updatedData);
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.include(updatedData);
    });

    it('should delete an existing customer', async () => {
        const response = await request(app).delete(`/customers/${filterCustomer.id}`);
        expect(response.status).to.equal(204);
        const getResponse = await request(app).get(`/customers/${filterCustomer.id}`);
        expect(getResponse.status).to.equal(404);
    });

    it('should get the optimized route based on company location', async () => {
        const response = await request(app).get('/customers/optimized-route');
        expect(response.status).to.equal(200);
    });
});
