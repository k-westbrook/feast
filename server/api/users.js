const router = require('express').Router()
const { Event, User, db, Item } = require('../db');



//GET REQUESTS FOR ITEMS FOR A PARTICULAR USER
router.get('/:userId/items', async (req, res, next) => {
  try {
    const userIdRequested = req.params.userId;
    const itemsFound = await Item.findAll({
      where: {
        userId: userIdRequested
      },
      include: [{ model: Event }]
    })


    res.json(itemsFound);

  } catch (err) {

    next(err);
  }

})

//PUT REQUESTS FOR ITEMS FOR A PARTICULAR USER
router.put('/updateUser', async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.session.userId;
    await User.update(
      {
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        photo: reqBody.photo
      },
      {
        where:
        {
          id: userId
        }

      })

    const updatedUser = await User.findById(userId);

    res.json(updatedUser);

  } catch (err) {

    next(err);
  }

})


//DELETE REQUEST FOR USER

router.delete('/deleteUser', async (req, res, next) => {
  try {
    const userId = req.session.userId;

    const userDeleted = await User.findById(userId);
    await Item.destroy({
      where: {
        userId: userId
      }
    })
    await User.destroy({
      where: {
        id: userId
      }
    }
    )
    const eventDeleted = await Event.findAll({
      where: {
        admin: userId
      }
    })
    await Event.destroy({
      where: {
        admin: userId
      }
    })

    req.session.userId = null;
    res.json({ userDeleted, eventDeleted });

  } catch (err) {

    next(err);
  }

})
module.exports = router;
