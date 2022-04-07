// i will need to make a p tag or header tag for today's date with moment.js

// create timeblocks for 9am-5pm probably with a for loop and array this will need to use bootstrap to create 1-width columns for the time, 10-width column for the details section and 1-width column for the save button

// we're going to have to save the middle text input region to localstorage, possibly connect each element with the localstorage so upon refresh it will check if there is anything in the local storage that should be there and when you save the content it will save it to the local storage
moment().format();

var currentDayEl = $("#currentDay");
var currentDay = moment().format('dddd, MMMM Do');
var containerEl = $(".container");
var timeblockElArray = [];
var tempRowEl;
currentDayEl.html(currentDay);

createRowElements();
setHours();

function createRowElements() {

    var hour = 9;
    var militaryHour = 9;
    var morning = true;

    console.log(moment().hour());

    for (var i = 0; i < 10; i++) {
        timeblockElArray[i] = $("<div>");
        timeblockElArray[i].attr('class', 'row time-block');
        containerEl.append(timeblockElArray[i]);
        tempRowEl = $("<div>");
        tempRowEl.attr('class', 'col-1 hour');
        timeblockElArray[i].append(tempRowEl);
        if (morning) {
            tempRowEl.text(hour + " AM");
        } else {
            tempRowEl.text(hour + " PM");
        }
        tempRowEl = $("<textarea>");
        tempRowEl.attr('class', 'col-10 description');
        if (moment().hour() === militaryHour) {
            tempRowEl.addClass('present');
        } else if (moment().hour() < militaryHour) {
            tempRowEl.addClass('future');
        } else {
            tempRowEl.addClass('past');
        }
        timeblockElArray[i].append(tempRowEl);
        tempRowEl = $("<div>");
        tempRowEl.attr('class', 'col-1 saveBtn');
        tempRowEl.html('<img src="./assets/saveIcon.png"/>')
        timeblockElArray[i].append(tempRowEl);
        hour++;
        militaryHour++;
        if (hour === 12) {
            morning = false;
        }
        if (hour === 13) {
            hour = 1;
        }
    }

}