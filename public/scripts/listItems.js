///////////////////////
// date picker setup //
///////////////////////
var today = new Date();
var prevDate = new Date("Jun 07 2018");

var field = document.getElementById("datepicker")
field.innerHTML = today.toDateString().split(" ", 3).join(" ");

var picker = new Pikaday({
    field: field,
    trigger: field,
    // trigger: document.getElementById('datepicker-button'),
    firstDay: 1,
    minDate: today,
    maxDate: new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000),
    yearRange: [
        today.getFullYear(), 
        new Date(today.getFullYear() + 1)
    ],
    onSelect: function(date){
        prevDate = picker;
        var noYear = (prevDate.toString()).split(" ", 3).join(" ");

        console.log(noYear);
        console.log("boop: ", prevDate.toString());
        field.innerHTML = noYear;
    }
});




