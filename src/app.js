import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 }
  })
);

app.use('/api/v1/auth', indexRoutes);

app.use((_req, res) => {
  res.status(404).send('Not Found');
});

export default app;
