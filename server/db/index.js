'use strict'
const User = require('./user')
const Event = require('./event')
const db = require('./database')




Event.hasMany(User);

// User.belongsToMany(Event, { as: 'userId', through: 'UserEvent' });
// Event.belongsToMany(User, { as: 'eventId', through: 'UserEvent' });
// User.belongsToMany(Event, { as: 'Admin', through: 'AdminEvent' });


module.exports = {

  db,
  User,
  Event
}
