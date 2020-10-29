const Product = require('../models/product.model')
const {getPostData} = require('../utils/acessFiles')

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
        const body = await getPostData(req)

        const {title, description, price} = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(newProduct))

    } catch (err) {
        console.log(err)
    }
}

// @desc update a single product Route /products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (product) {
            const body = await getPostData(req)

            const {title, description, price} = JSON.parse(body)

            const pacthedProduct = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updatedProduct = await Product.update(id, pacthedProduct)
            
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(updatedProduct))

        } else {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'product not found'}))
        }

    } catch (err) {
        console.log(err)
    }
}

// @desc delete a single product Route /products/:id
async function deleteProduct(req, res, id) {
    try { 
        const product = await Product.findById(id)

        if (product) {
            await Product.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `product ${id} removed`}))
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: "product not found"}))
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}