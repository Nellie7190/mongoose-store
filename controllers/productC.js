// DEPENDENCIES====================================== 
const express = require('express');
const productRouter = express.Router();
const Product = require('../models/products');

/////ROUTES==========================================

//INDEX
productRouter.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

//NEW
productRouter.get('/new', (req, res) => {
    res.render('new.ejs');
});

//DELETE
productRouter.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/products');
    });
});

//UPDATE
productRouter.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedProduct) => {
        res.redirect(`/products/${req.params.id}`);
    });
});


//CREATE
productRouter.post('/', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products')
    })
    // res.render('show.ejs');
});

//EDIT
productRouter.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        });
    })
});


//SHOW
productRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct
        });
    });
});

module.exports = productRouter;