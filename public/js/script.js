
let myEvents = [];
const pushEvents = async () => {
const response = await fetch('/api/calendar/events', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});
  const resJson = await response.json()
  resJson.map((data) => myEvents.push(data))
}

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true,
    droppable: true,
    editable: true,
    events: myEvents,
    eventClick: function (info) {
      alert("Event: " + info.event.title);
    },
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    }
  });


  document.getElementById("eventButton").addEventListener("click", function () {


    let task = prompt("Would you like to add an event? (Yes or No):");
    if (task.toLowerCase() === "yes") {
      let eventName = prompt("Enter the name of your new event:");
      let startDate = prompt("Enter the date of your event (Year-Month-Day ex: 2024-01-01):");
      let eventTime = prompt("What time is your event?:");
      let newArr = {title: eventName, start: startDate, time: eventTime};
      myEvents.push(newArr);
      calendar.addEvent(newArr);
    }
  });
  
  console.log(myEvents);
  calendar.render();

  var filterSelect = document.getElementById("filterSelect");

  filterSelect.addEventListener("change", function () {
    var selectedFilter = filterSelect.value;

    var filteredEvents = events.filter(function (event) {
      return selectedFilter === "all" || event.dataFilter === selectedFilter;
    });

    calendar.setOption("events", filteredEvents);
  });
});
