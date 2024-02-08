const { Calendar } = require('../models');

const calendarData = [
    {
    title: "Birthday",
    start: "2024-02-05",
    }
]

const seedCalendar = () => Calendar.bulkCreate(calendarData);

module.exports = seedCalendar;