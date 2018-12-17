const router = require('express').Router();
const { Event, User } = require('../db');


router.get('/:eventId', async (req, res, next) => {
  try {
    const eventIdRequested = req.params.eventId;
    const foundEvent = await Event.findOne({
      where: {
        id: eventIdRequested
      }
    })

    res.json(foundEvent);

  } catch (err) {

    next(err);
  }

})




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
