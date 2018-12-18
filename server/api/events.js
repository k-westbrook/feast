const router = require('express').Router();
const { Event, User, db } = require('../db');


//GET REQUESTS FOR EVENTS FOR A PARTICULAR USER
router.get('/:userId/events', async (req, res, next) => {
  try {
    const userIdRequested = req.params.userId;
    const userOne = await User.findById(userIdRequested);
    console.log(await User.findAll({ include: [{ model: Event }] }), "EVENTS");


    res.json(1);

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

    const foundGuests = await Event.findOne({
      where: {
        id: eventIdRequested
      },
      include: [{ model: User }]
    })


    res.json(foundGuests);

  } catch (err) {

    next(err);
  }

})





module.exports = router;
