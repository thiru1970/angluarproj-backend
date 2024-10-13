const express = require('express'); //to get the express library using require keyword 
const app = express(); //express instances (object) is created, app var holds the instance
const dotenv = require('dotenv'); //importing the dotenv package
const path = require('path'); //importing the path module
const cors = require ('cors');
const connect_db = require('./config/connect_db')
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

connect_db();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
}));

app.use(express.json())
app.use(cors());
const products = require('./routes/product')
const orders = require('./routes/order')

app.use('/api/v1/', products);
app.use('/api/v1/', orders);


app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODnE_ENV}`)
})