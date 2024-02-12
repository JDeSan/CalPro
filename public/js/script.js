
let myEvents = []
const pushEvents = async () => {
const response = await fetch('/api/calendar/events', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});
  console.log(response)
  myEvents.push(response)

}
pushEvents();

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
      left: "prev,next",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    }
  });

  document.getElementById("pushEvent").addEventListener("click", function () {
    
    let title = document.querySelector('#eventTitle').value.trim();
    let start = document.querySelector('#eventDate').value.trim();

      let newArr = {title: title, start: start};
      myEvents.push(newArr)
      calendar.addEvent(newArr);
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
