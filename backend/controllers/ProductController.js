const Product = require('../models/ProductModel.js')
const path = require('path')
const fs = require('fs');

const getProducts = async(req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

const getProductById = async(req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id : req.params.id
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

const saveProduct = async(req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No file uploaded"})
    const name = req.body.title
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/images/products/${fileName}`
    const allowedType = ['.png', '.jpg', '.jpeg']

    if(!allowedType.includes(ext.toLocaleLowerCase())) {
        return res.status(422).json({msg: "Invalide image"})
    } else if (fileSize > 5000000) {
        return res.status(422).json({msg: "Image must be less than 5 mb"})
    }

    file.mv(`./public/images/products/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message})
        try {
            await Product.create({name: name, image: fileName, url: url})
            res.status(201).json({msg: "Product created successfully"})
        } catch (error) {
            console.log(error.message)
        }
    })
}

const updateProduct = async(req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!product) return res.status(404).json({msg: "No Data Found"})
    let fileName = ""
    // jika user update title nya aja
    if(req.files === null) {
        fileName = Product.image
    } 
    // jika user update title sama gambar juga
    else {
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        fileName = file.md5 + ext
        const allowedType = ['.png', '.jpg', '.jpeg']

        if(!allowedType.includes(ext.toLocaleLowerCase())) {
            return res.status(422).json({msg: "Invalide image"})
        } else if (fileSize > 5000000) {
            return res.status(422).json({msg: "Image must be less than 5 mb"})
        }

        const filepath = `./public/images/products/${product.image}`
        fs.unlinkSync(filepath)

        file.mv(`./public/images/products/${fileName}`, (err) => {
            if(err) return res.status(500).json({msg: err.message})
        })
    }

    const name = req.body.title
    const url = `${req.protocol}://${req.get("host")}/images/products/${fileName}`
    try {
        await Product.update({name: name, image: fileName, url: url}, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({msg: "Product Updated Successfully"})
    } catch (error) {
        console.log(error.message);
    }
}

const deleteProduct = async(req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!product) return res.status(404).json({msg: "No Data Found"})

    try {
        const filepath = `./public/images/products/${product.image}`
        fs.unlinkSync(filepath)
        await Product.destroy({
            where: {
                id : req.params.id
            }
        })
        res.status(200).json({msg: "Product Deleted Successfully"})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { getProducts, getProductById, saveProduct, updateProduct, deleteProduct }