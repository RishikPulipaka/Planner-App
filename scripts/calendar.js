// Variables

const calendarInput = document.getElementById("calendar-input");
const calendarEvent = document.getElementById("calendar-event");
const calendarButton = document.getElementById("calender-button");
const calendarList = document.getElementById("calendar-list");

const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0");
const year = String(today.getFullYear());

const minDate = `${year}-${month}-${day}`;

calendarInput.setAttribute("min", minDate);

// Listeners

calendarList.addEventListener("click", deleteCalendarEvent);
document.addEventListener("DOMContentLoaded", getTodos);

// Functions

function addCalendarEvent(e) {
  e.preventDefault();

  const calendarDiv = document.createElement("div");
  calendarDiv.classList.add("todo");

  const newCalendar = document.createElement("li");
  newCalendar.innerHTML = `${calendarInput.value} <br> ${calendarEvent.value}`;

  let fullEvent = `${calendarInput.value}|${calendarEvent.value}`;
  saveLocalEvents(fullEvent);

  newCalendar.classList.add("todo-item");
  calendarDiv.appendChild(newCalendar);
  calendarInput.value = "";
  calendarEvent.value = "";

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class='fas fa-check'></i>`;
  completedButton.classList.add("complete-btn");
  calendarDiv.appendChild(completedButton);

  calendarList.appendChild(calendarDiv);
}

function deleteCalendarEvent(e) {
  const item = e.target;

  if (item.classList[0] == "complete-btn") {
    const event = item.parentElement;
    event.classList.add("remove");

    removeLocalEvents(event);
    event.addEventListener("transitionend", e => {
      event.remove();
    });
  }
}

function saveLocalEvents(calFullEvent) {
  let events;
  if (localStorage.getItem("events") === null) {
    events = [];
  } else {
    events = JSON.parse(localStorage.getItem("events"));
  }
  events.push(calFullEvent);
  localStorage.setItem("events", JSON.stringify(events));
}

function removeLocalEvents(calFullEvent) {
  let events;
  if (localStorage.getItem("events") === null) {
    events = [];
  } else {
    events = JSON.parse(localStorage.getItem("events"));
  }
  const calEventIndex = calFullEvent.children[0].innerText;
  events.splice(events.indexOf(calEventIndex), 1);
  localStorage.setItem("events", JSON.stringify(events));
}

function getTodos() {
  let events;
  if (localStorage.getItem("events") === null) {
    events = [];
  } else {
    events = JSON.parse(localStorage.getItem("events"));
  }
  events.forEach(function (calFullEvent) {
    const calendarDiv = document.createElement("div");
    calendarDiv.classList.add("todo");

    const calFullEventArray = calFullEvent.split("|");

    const newCalendar = document.createElement("li");
    newCalendar.innerHTML = `${calFullEventArray[0]} <br> ${calFullEventArray[1]}`;
    newCalendar.classList.add("todo-item");
    calendarDiv.appendChild(newCalendar);
    calendarInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    calendarDiv.appendChild(completedButton);

    calendarList.appendChild(calendarDiv);
  });
}
