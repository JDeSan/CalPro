const sequelize = require('../config/connection');
const { User } = require('../models');
const seedCalendar = require('./eventData');
const userData = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await sequelize.sync({ force: true });

  await seedCalendar();

  process.exit(0);
};

seedAll();
