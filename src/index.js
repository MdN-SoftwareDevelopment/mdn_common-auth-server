import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { PORT } from './config/server.js';
import appsRoutes from './routes/apps.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', appsRoutes);

app.listen(PORT);
