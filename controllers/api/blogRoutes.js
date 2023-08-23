const router = require('express').Router();
const { Blog } = require('../../models');

const withAuth = require('../../utils/auth');


// basic creation of new blog with post route
router.post('/', withAuth, async (req, res) => {

  try {
    const freshBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(freshBlog);
  } 
  
  catch (err) {
    console.log("Blog post error!");
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {

  try {
    const data = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!data) {
      res.status(404).json({ message: 'ERROR. Blog not found.' });
      return;
    }
    res.status(200).json(data);
  } 
  
  catch (err) {
    console.log("ERROR!");
    res.status(500).json(err);
  }
});


module.exports = router;