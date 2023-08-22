// includes POST routes to post new data

const router = require('express').Router();
const { User } = require('../../models');


// checks if user is logged in with user data
router.post('/', async (req, res) => {
  try {
    const data = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.logged_in = true;

      res.status(200).json(data);
    });

  } 

  catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
});


// logs user in
router.post('/login', async (req, res) => {
  try {
    const data = await User.findOne({ 
			where: { username: req.body.username } 
		});

    if (!data) {
      res
        .status(400)
        .json({ message: "Wrong username or password. Please try again." });
      return;
    }

    // validates if password is correct
    const correctPassword = await data.checkPassword(req.body.password);

    console.log("TEST HELLO!");

    if (!correctPassword) {
      res
        .status(400)
        .json({ message: "Wrong username or password. Please try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.logged_in = true;
      
      res.json({ user: data, message: "Login successful!" });
    });

  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});


// logs user out
router.post('/logout', (req, res) => {

// done with session.destroy
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });

  } else {
    res.status(404).end();
  }
});



module.exports = router;