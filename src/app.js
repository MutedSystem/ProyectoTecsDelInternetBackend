import express from 'express';
import morgan from 'morgan';

import productRoutes from './routes/product.route';

const app = express();

app.use(morgan('dev'));

app.use('/product/',productRoutes);

app.get('/',(req,res) => {
    res.send('holiiiiiiii');
})

export default app;