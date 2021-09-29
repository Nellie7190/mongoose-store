const express = require('express');
const app = express();
require('dotenv').config();
const Product = require('./models/products')
PORT = 3000;

// Dependencies
const mongoose = require('mongoose');


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
app.use(express.urlencoded({ extended: false }))


/////ROUTES
//INDEX
app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        })
    })
});

//NEW
app.get('/products/new', (req, res) => {
    res.render('new.ejs');
});

//DELETE


//UPDATE


//CREATE
app.post('/products', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products')
    })
    // res.render('show.ejs');
});

//EDIT


//SHOW
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct
        });
    })
});

//LISTENER
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});