const Sequelize = require('sequelize')
const db = require('./database');

const Item = db.define('item', {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Item;
