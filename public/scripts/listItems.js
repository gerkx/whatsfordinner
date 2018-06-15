

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


//hooks
let burgerSVG = document.querySelectorAll(".burger");
let logoSVG = document.querySelectorAll(".logoSVG");
let menuCloseSVG = document.getElementById("menuClose");
let trashSVG = document.querySelectorAll(".trashSVG");
let foodCloseSVG = document.querySelectorAll(".foodCloseSVG");
const navLogoSVG = document.getElementById("navLogoSVG");
const navBurgerSVG = document.getElementById("navBurgerSVG");

// menuCloseSVG.innerHTML = svg.remove("rmv-x stroke--ice");
// logoSVG.forEach(logo => logo.innerHTML = svg.logo("fill--ice"));

burgerSVG.forEach(burger => burger.innerHTML = svg.burger("mini-burger stroke--ice"));
trashSVG.forEach(trash => trash.innerHTML = svg.trash("ico--slate"));
foodCloseSVG.forEach(x => x.innerHTML = svg.remove("rmv-x stroke--slate"));
navLogoSVG.innerHTML = svg.logo("fill--cloud");
navBurgerSVG.innerHTML = svg.burger("mini-burger stroke--cloud");

/////////////////////
// food list stuff //
/////////////////////

let renderListItem = function(name, dept){
    const listLI = document.createElement("li");
    listLI.classList.add("li");
    listLI.classList.add(`li--${dept}`);
    listLI.innerHTML = `
    <div class="btn-box">
        <div class="ico ico--xs p-l-5 burger">
            ${svg.burger("mini-burger stroke--ice")}
        </div>
    </div>
    <input type="text" name="uniqueID" disabled value="${name}" class="txtbox txtbox__title">
    `
    return listLI;
}

let renderGroceryList = function(){
    const groceryList = document.getElementById("groceryList");
    // const listBurgers = document.querySelectorAll("btn-box");
    const listUL = document.createElement("ul");
    listUL.classList.add("list");
    groceryList.appendChild(listUL);

    foodItems.forEach(function(item){
        newItem = renderListItem(item.name, item.dept);
        groceryList.firstElementChild.appendChild(newItem);

    });
    
    
    let renderListBurger = function(buttonType){
        return`
            <div class="ico ico--xs p-l-5">
                ${svg.burger("mini-burger stroke--ice")}
            </div>
        `
    };


}


renderGroceryList();