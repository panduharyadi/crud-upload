// Package
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const port = 5000
const app = express()

// Folder & File
const ProductRoute = require('./routes/ProductRoutes')

app.use(cors())
app.use(express.json())
app.use(fileUpload());
app.use(express.static("public"))
app.use(ProductRoute)

app.listen(port, (req, res) => {
    console.log(`app listening on port ${port}`)
})