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
    defaultValue: 'public/defaultPhoto.png'
  }
})


module.exports = User;
