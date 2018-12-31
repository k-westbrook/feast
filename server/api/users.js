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
    const reqBody = req.body
    const userId = req.session.userId;
    await User.update(
      {
        name: reqBody.firstName,
        quantity: reqBody.lastName
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
module.exports = router;
