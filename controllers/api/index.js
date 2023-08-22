const router = require('express').Router();

const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');


// will need to direct as localhost:3001/blogs in INSOMNIA
router.use('/blogs', blogRoutes);

// localhost:3001/users
router.use('/users', userRoutes);

// localhost:3001/comments
router.use('/comments', commentRoutes);


module.exports = router;