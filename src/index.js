import app from './app.js';

app.listen(54215 || process.env.PORT, ()=>{
    console.log('server on port 3000');
});