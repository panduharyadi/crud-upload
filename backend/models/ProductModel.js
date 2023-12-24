const Sequelize = require('sequelize')
const db = require('../config/Databases')

const {DataTypes} = Sequelize

const Product = db.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
        freezeTableName: true,
        timeStamps: true
})

module.exports = Product;

// lakukan migrations jika table gaad di database
( async() => {
    await db.sync()
}) ()