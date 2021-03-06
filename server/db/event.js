const Sequelize = require('sequelize')
const db = require('./database');

const Event = db.define('event', {

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Event;
