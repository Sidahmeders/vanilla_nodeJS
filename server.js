const http = require('http')
const { getProducts, getProduct, createProduct } = require('./controllers/product.controller')

// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<h1>Hello World</h1>')
//     res.end()
// })

const server = http.createServer((req, res) => {
    if (req.url === '/products' && req.method === 'GET') {
        getProducts(req, res)
    } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        console.log(id)
        getProduct(req, res, id)
    } else if (req.url === '/products' && req.method === 'POST') {
        createProduct(req, res)
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: "route not found"}))
    }
})

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`server runnig on ${port}`))