import express from 'express';
const router = express.Router();

import CustomerRouter from './customerRouter.js';

router.use('/customers', CustomerRouter);

export default router;
