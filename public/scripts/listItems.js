///////////////////////
// date picker setup //
///////////////////////
var today = new Date();
var currentYear = today.getFullYear();

var nextYear = new Date(today.getFullYear() + 1);
var maxDate = new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000);
var dateStr = today.toString();
var prevDate = new Date('2018-06-06');

// var field = document.getElementById('datepicker');
console.log(prevDate);

var field = document.getElementById("datepicker")

// var boop = "";

field.innerHTML = prevDate;

var picker = new Pikaday({
    field: field,
    trigger: document.getElementById('datepicker-button'),
    firstDay: 1,
    minDate: today,
    maxDate: maxDate,
    yearRange: [currentYear, nextYear],
    onSelect: function(date){
        var boop = picker.toString();
        console.log("boop: ", boop);
        field.innerHTML = boop;

    }


});




