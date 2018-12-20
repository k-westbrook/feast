'use strict'
const User = require('./user')
const Event = require('./event')
const db = require('./database')
const Item = require('./item')


User.belongsToMany(Event, { through: 'UserEvent' });
Event.belongsToMany(User, { through: 'UserEvent' });

Item.belongsTo(User);
User.hasMany(Item);

Event.hasMany(Item);
Item.belongsTo(Event);



module.exports = {

  db,
  User,
  Event,
  Item
}
