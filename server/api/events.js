const router = require('express').Router();
const { Event, User, db, Item } = require('../db');


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

//GET REQUEST FOR A PARTICULAR EVENT's ITEM LIST
//GET REQUEST FOR PATICULAR EVENT
router.get('/items/:eventId', async (req, res, next) => {
  try {
    const eventIdRequested = req.params.eventId;
    const foundItems = await Item.findAll({
      where: {
        eventId: eventIdRequested
      },
      include: [{ model: User }]
    })


    res.json(foundItems);

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

//PUT ADD GUEST TO A PARTICUALR EVENT
router.put('/addGuest/:eventId', async (req, res, next) => {
  try {
    const reqBody = req.body;
    const eventId = req.params.eventId;
    console.log(reqBody, "BODY")
    const userFound = await User.findOne({
      where: {
        email: reqBody.email
      }
    });

    const eventFound = await Event.findById(eventId)

    await eventFound.addUser(userFound);

    res.json(userFound);

  } catch (err) {

    next(err);
  }
})


//POST TO PLACE AN ITEM WITH A PARTICULAR GUEST AND EVENT
router.post('/addItem/:eventId', async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.session.userId;


    const itemAdded = await Item.create(
      {
        name: reqBody.name,
        quantity: reqBody.quantity,
        userId: userId,
        eventId: req.params.eventId
      })


    res.json(itemAdded);

  } catch (err) {

    next(err);
  }

})


//REMOVE GUEST FROM A PARTICUALR EVENT
router.delete('/removeGuest/:eventId/:userId', async (req, res, next) => {
  try {

    const eventId = req.params.eventId;
    const userId = req.params.userId;

    const userFound = await User.findOne({
      where: {
        id: userId
      }
    });

    const eventFound = await Event.findById(eventId)

    await eventFound.removeUser(userFound);

    res.json(userFound);

  } catch (err) {

    next(err);
  }
}
)



//REMOVE ITEM FROM A PARTICUALR EVENT
router.delete('/removeItem/:itemId', async (req, res, next) => {
  try {

    const itemId = req.params.itemId;
    const itemFound = await Item.findOne({
      where: {
        id: itemId
      }
    })
    await Item.destroy({
      where: {
        id: itemId
      }
    });



    res.json(itemFound);

  } catch (err) {

    next(err);
  }
}
)


module.exports = router;
