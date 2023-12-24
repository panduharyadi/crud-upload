const express = require('express')
const Product = require('../models/ProductModel')
const {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/ProductController')

const router = express.Router()

router.get('/products', getProducts)
router.get('/product/:id', getProductById)
router.post('/product', saveProduct)
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

module.exports = router