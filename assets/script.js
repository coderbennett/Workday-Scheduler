// i will need to make a p tag or header tag for today's date with moment.js

// create timeblocks for 9am-5pm probably with a for loop and array this will need to use bootstrap to create 1-width columns for the time, 10-width column for the details section and 1-width column for the save button

// 
moment().format();

var currentDayEl = $("#currentDay");
var currentDay = moment().format('dddd, MMMM Do');
currentDayEl.html(currentDay);
