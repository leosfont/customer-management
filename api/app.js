import express from 'express';
import { json } from 'express';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();

app.use(cors());
app.use(json());
app.use(router);

export default app;
