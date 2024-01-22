import express from 'express';
import CustomerController from '../app/http/controllers/CustomerController.js';

const CustomerRouter = express.Router();
const customerController = new CustomerController();

CustomerRouter.get('/optimized-route', (req, res) => customerController.optimizedRoute(req, res));

CustomerRouter.get('/:id', (req, res) => customerController.findById(req, res));
CustomerRouter.get('/', (req, res) => customerController.paginate(req, res));
CustomerRouter.post('/', (req, res) => customerController.create(req, res));
CustomerRouter.put('/:id', (req, res) => customerController.update(req, res));
CustomerRouter.delete('/:id', (req, res) => customerController.delete(req, res));



export default CustomerRouter;
