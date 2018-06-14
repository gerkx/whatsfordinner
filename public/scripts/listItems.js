

///////////////////////
// date picker setup //
///////////////////////
var today = new Date();
var prevDate = new Date("Jun 07 2018");

var field = document.getElementById("datepicker")
if(field){
    field.innerHTML = today.toDateString().split(" ", 3).join(" ");

}

let picker = new Pikaday({
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



let burgers = document.getElementsByClassName("burger");

// burgers[0].innerHTML = burger("mini-burger stroke--ice");
for(let i=0; i<burgers.length; i++){
    burgers[i].innerHTML = svg.burger("mini-burger stroke--ice");
}

// for(let val of burgers){
//     this.innerHTML = burger("mini-burger stroke--ice");
// };

// burgers.forEach(){
//     this.innerHTML = burger("mini-burger stroke--ice");
// };


