//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();

//Routes / Controllers
const productsController = require('./controllers/productC');
app.use('/products', productsController);


// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

const Log = require('./models/products')

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


//LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});