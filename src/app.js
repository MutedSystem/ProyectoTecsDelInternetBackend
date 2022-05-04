import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import productRoutes from '../src/routes/product.routes';
import authRoutes from './routes/auth.routes';
import buyRoutes from './routes/buy.routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/products', productRoutes);

app.use('/auth', authRoutes);

app.use('/buy',buyRoutes);

export default app;