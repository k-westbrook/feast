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
module.exports = router;
