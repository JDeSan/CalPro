const router = require('express').Router();
const { Calendar, User } = require('../../models');

router.get('/', (req,res) => {
    Calendar.findAll({})
    .then(eventData => res.json(eventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.get('/events', async (req, res) => {
  try {
    const eventData = await Calendar.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: { exclude: ['user_id'] }
    });
    res.status(200).json(eventData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const newEvent = await Calendar.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const eventData = await Calendar.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No event found with this id!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
