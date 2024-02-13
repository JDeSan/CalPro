
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
  pushEvents()
  .then(() => {
    console.log(myEvents);
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

        if (title && start) {
          const response = fetch(`/api/calendar`, {
            method: 'POST',
            body: JSON.stringify({ title, start}),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            document.location.replace('/');
          } 
        }
      
      });
    
    calendar.render();
  
    var filterSelect = document.getElementById("filterSelect");
  
    filterSelect.addEventListener("change", function () {
      var selectedFilter = filterSelect.value;
  
      var filteredEvents = events.filter(function (event) {
        return selectedFilter === "all" || event.dataFilter === selectedFilter;
      });
  
      calendar.setOption("events", filteredEvents);
    });
  })

});
