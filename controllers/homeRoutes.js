const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// may need to install npm dependency for auth
const withAuth = require('../utils/auth');


// Get route for landing page/homepage
router.get('/', async (req, res) => {

	try {
		const data = await Blog.findAll({
			include: [
                {
				model: User,
				attributes: ['username'],
			    },
        ],
		});

		const multBlogs = data.map((blog) => blog.get({
			plain: true
		}));

		res.render('homepage', {
			multBlogs,
			logged_in: req.session.logged_in
		});
	} 
    
    catch (err) {
        console.log("Error!");
		res.status(500).json(err);
	}
});


// console.log("TEST TEST TEST HERE???? TEST ON HANDLEBARS");


// able to get and redirect to specific blog by ID in route
router.get('/blog/:id', async (req, res) => {

	try {
		const data = await Blog.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},

                {
					model: Comment,
					include: [ User ]
				},
			],
		});

		const blog = data.get({
			plain: true
		});

		res.render('blog', {
			...blog,
			logged_in: req.session.logged_in
		});

	} 
    
    catch (err) {
        console.log("Get blog by ID error!");
		res.status(500).json(err);
	}
});

// console.log("TEST TEST TEST HERE???? TEST ON HANDLEBARS");


// Dashboard page
router.get('/dashboard', withAuth, async (req, res) => {

    // will fetch users' data
	try {
		const data = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},

			include: [
                { model: Blog }
        ],
		});

		const user = data.get({
			plain: true
		});

		res.render('dashboard', {
			...user,
			logged_in: true
		});
	} 
    
    catch (err) {
        console.log("DASHBOARD ERROR (user data)");
        // console.log("ERROR!");
		res.status(500).json(err);
	}
});




// login page
router.get('/login', (req, res) => {

    // redirects to /dashboard if user is already logged in
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});


// signup page
router.get('/signUp', (req, res) => {

    // redirects to /dashboard if user is already logged in
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('signUp');
});

module.exports = router;