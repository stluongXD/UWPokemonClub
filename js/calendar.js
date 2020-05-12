'use strict';

// function fills in the days of the month and changes the header of the
// month to its corresponding given month and year
function renderCalendar(year, month, dayOfMonth) {
    let givenDate = new Date(year, month, dayOfMonth, 0, 0, 0, 0); // the ending 0's refer to time (hour, seconds milliseconds etc.)
    // changes the heading of the calendar based on the month
    let monthIndex = givenDate.getMonth();
    let pokemonOfMonth = "<img class='month-pokemon' src='imgs/" + pokemonPerMonth[monthIndex] + ".png' alt='month pokemon chansey'>";
    let monthClass = $(".month-name");
    monthClass.html(pokemonOfMonth + monthNames[monthIndex] + " Year: " + state.currentYear + pokemonOfMonth);
    let numOfDays = 32 - new Date(year, month, 32).getDate(); // calculate total number of days in a given month
    let startDate = new Date(year, month, 1, 0, 0, 0);
    let startDayOfWeek = startDate.getDay() + 1;

    let days = $(".num-days");

    // clears calendar
    days.empty();

    // fills in blanks before the first of the month
    for (let i = 1; i < startDayOfWeek; i++) {
        let blank = $("<li>");
        days.append(blank);
    }

    // fills in the numbered days of the month
    for (let i = 1; i <= numOfDays; i++) {
        let dayCard = $("<li>");
        dayCard.text(i);
        let revMonth = month + 1;
        let strMonth = ""
        if (revMonth < 10) {
            strMonth = `0${revMonth}`;
        } else {
            strMonth = `${revMonth}`;
        }
        let revDay = "";
        if (i < 10) {
            revDay = `0${i}`;
        } else {
            revDay = `${i}`;
        }
        let date = `${year}-${strMonth}-${revDay}`;
        state.events.forEach(function (event) {
            if (event.date === date) {
                //console.log(event);
                let newEvent = createEvent(event);
                dayCard.append(newEvent);
                dayCard.addClass("show-event");
                dayCard.css({
                    "backgroundImage":"url('imgs/diglett.png')",
                    "backgroundSize":"20px auto",
                    "backgroundRepeat":"no-repeat",
                    "backgroundPosition":"center",
                    "backgroundAttachment":"local"
                });
            }
        })
        days.append(dayCard);
    }
}

// creates new event DOM element
function createEvent(event) {
    let eventInfo = $("<div>");
    eventInfo.addClass("scheduled-event");
    eventInfo.text(`${event.name}: ${event.desc}`);
    return eventInfo;
}

// update state.events based on user inputs in the form
function updateEvents() {
    let newEvent = {};
    newEvent.first = $(".first").val();
    newEvent.last = $(".last").val();
    newEvent.email = $(".email").val();
    newEvent.name = $(".name").val();
    newEvent.date = $(".date").val();
    newEvent.desc = $(".desc").val();
    state.events.push(newEvent);
    let splitDate = newEvent.date.split("-");
    state.currentMonth = splitDate[1] - 1;
    state.currentYear = splitDate[0];
    renderCalendar(state.currentYear, state.currentMonth, splitDate[2]);
}

let state = {
    currentMonth: 0,
    currentYear: 2020,
    events: []
}

let monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

let pokemonPerMonth = ["lapras", "chansey", "pansage", "zoroark", "bellossom", "manaphy", "braviary",
"charizard", "slowking", "mimikyu", "shaymin", "delibird"];

let today = new Date();
state.currentYear = today.getFullYear();
state.currentMonth = today.getMonth();

let dateSelctor = $(".date");
dateSelctor.val(today);

// pulls in data from the csv
d3.csv("events.csv").then(function(data) {
    data.forEach(function(item) {
        let newEvent = {};
        newEvent.first = item.first_name;
        newEvent.last = item.last_name;
        newEvent.email = item.email;
        newEvent.name = item.event_name;
        newEvent.date = formatDateObject(item.date);
        newEvent.desc = item.description;
        state.events.push(newEvent);
    })

    renderCalendar(today.getFullYear(), today.getMonth(), today.getDate());
})

renderCalendar(today.getFullYear(), today.getMonth(), today.getDate());
let previousMonth = $(".prev");
let nextMonth = $(".next");

previousMonth.click(function () {
    state.currentMonth = state.currentMonth - 1;
    if (state.currentMonth < 0) {
        state.currentYear = Number(state.currentYear) - 1;
        state.currentMonth = 11;
    }
    renderCalendar(state.currentYear, state.currentMonth, 15);
});

nextMonth.click(function () {
    state.currentMonth = state.currentMonth + 1;
    if (state.currentMonth > 11) {
        state.currentYear = Number(state.currentYear) + 1;
        state.currentMonth = 0;
    }
    renderCalendar(state.currentYear, state.currentMonth, 15);
});

let eventButton = $(".new-event");
let form = $("form");
let submitButton = $(".submit");
eventButton.click(function () {
    $(this).css("display", "none");
    form.css("display", "block");
    submitButton.css("display", "block");
})

submitButton.click(function () {
    updateEvents();
    $(this).css("display", "none");
    form.trigger("reset");
    form.css("display", "none");
    eventButton.css("display", "block");
});


function formatDateObject (strDate) {
    let arr = strDate.split("/"); // assumes the date is stored in m/d/yy format Ex. 3/10/20
    let month = arr[0];
    if (month < 10) {
        month = "0" + month;
    }
    let day = arr[1];
    if (day < 10) {
        day = "0" + day;
    }
    let year = arr[2];
    year = "20" + year; // need to add the extra 20 to make the full year with 4 digits
    let givenDate = year + "-" + month + "-" + day;
    return givenDate;
}


