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

      res.json({ incorrect: true });
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
    const reqBody = req.body;

    const checkNewUser = await User.findOrCreate({
      where:
        { email: reqBody.email },
      defaults: {
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        password: reqBody.password
      }
    }
    );

    if (!checkNewUser[1]) {
      res.json({ taken: true })
    } else {
      const newUser = checkNewUser[0];
      req.session.userId = newUser.id;

      res.json(newUser);
    }
  } catch (err) {

    next(err);
  }

})

router.delete('/logout', async (req, res, next) => {

  req.session.destroy();
  res.status(204).end();

})


module.exports = router;
