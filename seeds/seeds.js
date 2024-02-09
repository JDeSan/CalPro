const sequelize = require('../config/connection');
const { User, Calendar } = require('../models');
const userData = require('./userData.json');
const calendarData = require('./eventData.json')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const event of calendarData) {
    await Calendar.create({
      ...event,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedAll();
