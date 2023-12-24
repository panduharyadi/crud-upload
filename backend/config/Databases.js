const Sequelize = require('sequelize')

const db = new Sequelize('upload_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = db