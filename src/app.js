import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
  fileUpload({
    useTempFiles: true
  })
);

app.use('/api/v1/auth', indexRoutes);
app.use((_req, res) => {
  res.status(404).send('Not Found');
});

export default app;
