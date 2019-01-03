const Sequelize = require('sequelize')
const db = require('./database');

const User = db.define('user', {

  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://images-na.ssl-images-amazon.com/images/I/51zLZbEVSTL._SX425_.jpg'
  }
})


module.exports = User;
