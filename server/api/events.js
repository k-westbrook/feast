const router = require('express').Router();
const { Event, User, db } = require('../db');


//GET REQUESTS FOR EVENTS FOR A PARTICULAR USER
router.get('/:userId/events', async (req, res, next) => {
  try {
    const userIdRequested = req.params.userId;
    const userFound = await User.findById(
      userIdRequested,
      { include: [{ model: Event }] }
    )
    const allEvents = await userFound.getEvents();

    res.json(allEvents);

  } catch (err) {

    next(err);
  }

})

//GET REQUEST FOR PATICULAR EVENT
router.get('/:eventId', async (req, res, next) => {
  try {
    const eventIdRequested = req.params.eventId;
    const foundEvent = await Event.findOne({
      where: {
        id: eventIdRequested
      },
      include: [{ model: User }]
    })


    res.json(foundEvent);

  } catch (err) {

    next(err);
  }

})



//GET REQUESTS FOR USERS AT PARTICULAR EVENT
router.get('/guests/:eventId', async (req, res, next) => {
  try {
    const eventIdRequested = req.params.eventId;

    const foundEvent = await Event.findOne({
      where: {
        id: eventIdRequested
      },
      include: [{ model: User }]
    })
    const foundGuests = await foundEvent.getUsers();

    res.json(foundGuests);

  } catch (err) {

    next(err);
  }

})


//ADD EVENT REQUEST

router.post('/createEvent', async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.session.userId;
    const userFound = await User.findById(userId);
    const eventAdded = await Event.create({ title: reqBody.title, password: reqBody.password, admin: userId })

    await eventAdded.addUser(userFound);
    res.json(eventAdded);

  } catch (err) {

    next(err);
  }

})

//need to get event id to make instance and then add guest to that instance
router.put('/addGuest', async (req, res, next) => {
  try {
    const reqBody = req.body;

    const userFound = await User.findOne({
      where: {
        email: reqBody.email
      }
    });


    await Event.addUser(userFound);
    res.json(userFound);

  } catch (err) {

    next(err);
  }
})

module.exports = router;
