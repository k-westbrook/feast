const router = require('express').Router();
const { User } = require('../db');



router.put('/login', async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const foundOne = await User.findOne({
      where: {
        email: email,
        password: password
      }
    });

    if (foundOne) {
      req.session.userId = foundOne.id;

      res.json(foundOne);
    } else {
      res.status(401).json("Incorrect Email or Password");
    }
  } catch (err) {

    next(err);
  }
})


router.get('/me', async (req, res, next) => {

  try {

    const userIdFound = req.session.userId;

    if (!userIdFound) {

      res.status(404).json();
    } else {

      const loggedInUser = await User.findOne({
        where: {
          id: userIdFound
        }
      });
      if (!loggedInUser) {
        res.status(404).json();
      } else {
        res.json(loggedInUser);
      }
    }
  } catch (err) {

    next(err)
  }


})

router.post('/addUser', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    req.session.userId = newUser.id;
    res.json(newUser);
  } catch (err) {

    next(err);
  }

})

router.delete('/logout', async (req, res, next) => {

  req.session.destroy();
  res.status(204).end();

})


module.exports = router;
