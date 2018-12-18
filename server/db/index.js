'use strict'
const User = require('./user')
const Event = require('./event')
const db = require('./database')


User.belongsToMany(Event, { through: 'UserEvent' });
Event.belongsToMany(User, { through: 'UserEvent' });

// User.belongsToMany(Event, { as: 'users', through: 'UserEvent', foreignKey: 'userId' });
// Event.belongsToMany(User, { as: 'events', through: 'UserEvent', foreignKey: 'eventId' });



module.exports = {

  db,
  User,
  Event
}
