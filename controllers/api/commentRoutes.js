const router = require('express').Router();
const { Comment } = require('../../models');

const withAuth = require('../../utils/auth');


// basic get route to find all comments posted by passing through comments' data as json
router.get('/', (req,res) => {

    Comment.findAll({})

    .then(data => res.json(data))

    .catch(err => {
        console.log("Error!");
        res.status(500).json(err)
    });
});


// can view comment by its specific comment id
router.get('/:id', (req, res) => {

    Comment.findAll({
            where: {
                id: req.params.id
            }
        })

        .then(data => res.json(data))

        .catch(err => {
            console.log("Error!");
            res.status(500).json(err);
        })
});


// allows for creation of new comment
router.post('/', async (req, res) => {

  try {
    const freshComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(freshComment);
  } 

  catch (err) {
    console.log("Error!");
    res.status(500).json(err);
  }
});


// allows for comment deletion
// may need to test setting allowNull to true
router.delete('/:id', withAuth, async (req, res) => {

  try {
    const data = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!data) {
      res.status(404).json({ message: "Error. Comment not found." });
      return;
    }
    res.status(200).json(data);
} 
  
    catch (err) {
    console.log("Error!");
    res.status(500).json(err);
  }
});



module.exports = router;