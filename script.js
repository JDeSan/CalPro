let events = [
    {
      title: 'Event 1',
      start: '2024-02-01',
      dataFilter: 'filter1'
    },
    {
      title: 'Event 2',
      start: '2024-02-02',
      dataFilter: 'filter2'
    },
  ];


document.addEventListener("DOMContentLoaded", function () {
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      selectable: true,
      droppable: true,
      editable: true,
      events: events,
      eventClick: function(info) {
        alert('Event: ' + info.event.title);
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      addEvent: function(addEvent) {
        prompt('');
      }

    });
    // calendar.addEvent( event [, source ] )
    calendar.render();

    var filterSelect = document.getElementById('filterSelect');

    filterSelect.addEventListener('change', function() {
      var selectedFilter = filterSelect.value;

      var filteredEvents = events.filter(function(event) {
        return selectedFilter === 'all' || event.dataFilter === selectedFilter;
      });

      calendar.setOption('events', filteredEvents);
    });

  });

