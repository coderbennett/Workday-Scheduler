//use jquery to set a pointer to the currentday p tag element in the html
var currentDayEl = $("#currentDay");
//create a currentday element with the current date from moment.js
var currentDay = moment().format('dddd, MMMM Do');
//use jquery to set a pointer to the container element for the timeblocks
var containerEl = $(".container");
//create a timeblock element array to hold pointers to all the timeblock elements
var timeblockElArray = [];
//create a tempRow element pointer for the initial setup for the elements within the timeblocks
var tempRowEl;
//create a descriptions variable to hold the local storage array with all the description text
var descriptions;

//set the text of the current day p tag element to the current day
currentDayEl.text(currentDay);

//check the local storage for the description array, if it isnt there create one, and if it is there, set the descriptions variable to the array
if(localStorage.getItem("descriptions") === null) {
    localStorage.setItem("descriptions", JSON.stringify(["", "", "", "", "", "", "", "", ""]));
} else {
    descriptions = JSON.parse(localStorage.getItem("descriptions"));
}

//create the row elements with our create row elements function
createRowElements();

//this event listener listens for clicks on all the saveBtn class elements and calls the saveDescription function when one is clicked
$(".saveBtn").on("click", saveDescription);

function createRowElements() {
    //the timeblocks start at 9 so we start with hour 9 for this variable
    var hour = 9;
    //we will need to keep track of the hours in military time also to decide what color the description sections should be so we will need to keep track of this as we create each element
    var militaryHour = 9;
    //to decide whether to put AM or PM in the hour element we are going to use a morning boolean to decide what to do
    var morning = true;

    //this for loop creates all the timeblocks with all their respective needs
    for (var i = 0; i < 10; i++) {

        //this first section creates the timeblock row element and appends it as a child to the container element
        timeblockElArray[i] = $("<div>");
        timeblockElArray[i].attr('class', 'row time-block');
        containerEl.append(timeblockElArray[i]);

        //now we are creating the hour element for the timeblock at the current index, setting appropriate classes, and applying the proper text for the hour
        tempRowEl = $("<div>");
        tempRowEl.attr('class', 'col-1 hour');
        timeblockElArray[i].append(tempRowEl);
        if (morning) {
            tempRowEl.text(hour + " AM");
        } else {
            tempRowEl.text(hour + " PM");
        }

        //in this section we are creating the description section for the timeblock, appending the correct description from local storage, setting proper classes, using moment.js to check the current hour to set the proper class styling for coloring
        tempRowEl = $("<textarea>");
        tempRowEl.text(descriptions[i]);
        tempRowEl.attr('class', 'col-10 description');
        tempRowEl.val(descriptions[i]);
        if (moment().hour() === militaryHour) {
            tempRowEl.addClass('present');
        } else if (moment().hour() < militaryHour) {
            tempRowEl.addClass('future');
        } else {
            tempRowEl.addClass('past');
        }
        timeblockElArray[i].append(tempRowEl);

        //for the final timeblock row element, we are setting up the save button with the proper classes, adding a floppydisk to the content, and also adding a data attribute to reference for saving our descriptions to local storage later
        tempRowEl = $("<div>");
        tempRowEl.addClass('col-1 saveBtn');
        tempRowEl.attr('index', i);
        tempRowEl.html('💾')
        timeblockElArray[i].append(tempRowEl);

        //here we are incrementing the hour for the upcoming timeblock's elements. we also have some if statements to catch the cases when the AM/PM change or when the 12PM to 1PM change needs to happen
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

//the save description function is triggered by a click event on a save button
function saveDescription(event){
    //set this variable as a pointer to the button that was clicked
    var el = event.target;

    //check the data attribute index for this button and set the previous description element's value to the description array at that index
    descriptions[$(el).attr("index")] = $(el).prev().val();

    //update localstorage with the newly updated descriptions array
    localStorage.setItem("descriptions", JSON.stringify(descriptions));
}