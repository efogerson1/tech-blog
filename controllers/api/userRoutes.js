const router = require('express').Router();
const { User } = require('../../models');



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

    const correctPassword = await data.checkPassword(req.body.password);

    console.log("test hello world");

    if (!correctPassword) {
      res
        .status(400)
        .json({ message: "Wrong username or password. Please try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.logged_in = true;
      
      res.json({ user: data, message: "Login successful" });
    });

  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});


router.post('/logout', (req, res) => {

  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });

  } else {
    res.status(404).end();
  }
});



module.exports = router;