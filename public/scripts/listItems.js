

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


trashSVG.forEach(trash => trash.innerHTML = svg.trash("ico--slate"));
foodCloseSVG.forEach(x => x.innerHTML = svg.remove("rmv-x stroke--slate"));
navLogoSVG.innerHTML = svg.logo("fill--cloud");
navBurgerSVG.innerHTML = svg.burger("mini-burger stroke--cloud");

///////////////
// Page divs //
///////////////
const groceryList = document.getElementById("groceryList");

/////////////////////
// food list stuff //
/////////////////////

const renderListItem = function(name, dept){
    const listLI = document.createElement("li");
    listLI.classList.add("li");
    listLI.classList.add(`li--${dept}`);
    listLI.id = name;
    listLI.innerHTML = `
    <div class="btn-box">
        <div class="ico ico--xs p-l-5"></div>
    </div>
    <input type="text" name="uniqueID" disabled value="${name}" class="txtbox txtbox__title">
    `
    return listLI;
}

const renderCheckBox = function(){
    const checkBox = document.createElement("div");
    checkBox.classList.add("check-box");
    checkBox.classList.add("check-box--border-ice");
    return checkBox
}


const renderGroceryList = function(parentDiv){
    let foods = foodItems;
    const listUL = document.createElement("ul");
    listUL.classList.add("list");
    parentDiv.appendChild(listUL);

    foods.forEach(function(item, index){
        if(item.amt > 0){
            newItem = renderListItem(item.name, item.dept);
            parentDiv.firstElementChild.appendChild(newItem);
        }
    });

    let btnBox = parentDiv.querySelectorAll(".btn-box");
    btnBox.forEach(function(item, index){
        btnBoxChild = item.firstElementChild;
        newBox = renderCheckBox();
        btnBoxChild.appendChild(newBox);
    });

    const list = parentDiv.querySelector(".list");
    list.addEventListener("click", function(event){
        let target = event.target;
        if(target === list){ return }
        while(target.parentNode && target.parentNode !== list){
            target = target.parentNode
        }
        const foodObj = foods.filter(obj => obj.name === target.id)[0];
        const chkbox = target.querySelector(".check-box");
        const title = target.querySelector(".txtbox");
        chkbox.classList.toggle("check-box--chk-ice");
        title.classList.toggle("txtbox--done");
        target.classList.toggle(`li--${foodObj.dept}`);
        target.classList.toggle("li-done");
        if(foodObj.checked){
            foodObj.checked=false;
        }else{
            foodObj.checked=true;
        }

        
        
    });

    



}


renderGroceryList(groceryList);