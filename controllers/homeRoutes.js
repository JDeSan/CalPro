const router = require('express').Router();
const { User, Calendar} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
	try {
		const calendarData = await Calendar.findAll({
			include: [{
				model: User,
				attributes: ['username'],
			},],
		});

		const events = calendarData.map((event) => event.get({
			plain: true
		}));

		res.render('homepage', {
			events,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/event/:id', async (req, res) => {
	try {
		const eventData = await Calendar.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				}, {
					model: Comment,
					include: [
						User
					]
				}
			],
		});

		const event = eventData.get({
			plain: true
		});

		res.render('event', {
			...event,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: Calendar
			}],
		});

		const user = userData.get({
			plain: true
		});

		res.render('dashboard', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

router.get('/signUp', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signUp');
});

module.exports = router;