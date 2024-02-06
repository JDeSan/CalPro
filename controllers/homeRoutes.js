const router = require('express').Router();
const { User, Calendar} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
	try {
		const calendarData = await Calendar.findAll({
			include: [{
				model: User,
				attributes: ['email'],
			},],
		});

		const events = calendarData.map((event) => event.get({
			plain: true
		}));

		res.render('index', {
			events,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/event/:id', withAuth, async (req, res) => {
	try {
		const eventData = await Calendar.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['email'],
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

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

router.get('/signUp', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}
	res.render('signUp');
});

module.exports = router;