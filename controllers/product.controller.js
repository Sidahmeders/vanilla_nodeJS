const Product = require('../models/product.model')

// @desc get all products Route /products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (err) {
        console.log(err)
    }
}

// @desc get a single product Route /products/:id
async function getProduct(req, res, id) {
    try { 
        const product = await Product.findById(id)

        if (product) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'product not found'}))
        }
    } catch (err) {
        console.log(err)
    }
}

// @desc create a sinle product Route /products
async function createProduct(req, res) {
    try { 
        const product = {
            title: 'TEST product',
            description: 'this is my product',
            price: 120
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(newProduct))

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct
}