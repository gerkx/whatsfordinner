

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

const renderListItem = function(item){
    const listLI = document.createElement("li");
    listLI.classList.add("li");
    if(item.checked == false){
        listLI.classList.add(`li--${item.dept}`);
    }else{
        listLI.classList.add("li-done");
    }
    listLI.id = item.id;
    listLI.innerHTML = `
    <div class="btn-box">
        <div class="ico ico--xs p-l-5"></div>
    </div>
    <input type="text" name="uniqueID" disabled value="${item.name}" class="txtbox txtbox__title">
    `
    return listLI;
}

const renderCheckBox = function(){
    const checkBox = document.createElement("div");
    checkBox.classList.add("check-box");
    checkBox.classList.add("check-box--border-ice");
    return checkBox
}

const renderCheckoutButton = function(){
    const btn = document.createElement("div");
    btn.classList.add("round");
    btn.innerHTML = svg.checkout();
    return btn;
}

const removePurchasedItemsFromDB = function(list){
    console.log(list)
    list.forEach((item, index, obj) => {
        if(item.amt == 0){
            obj.splice(index, 1);
        }
    });
    console.log("after: ", list)
}

const resetPurchasedItems = function(list){
    list.filter((obj, index) => obj.checked == true)
        .forEach(obj => {
            obj.amt = 0; 
            obj.checked = false;
        });
}


const removePurchasedItemsFromDisplay = function(parentDiv){
    let doneItems = parentDiv.querySelectorAll(".li-done")
        .forEach(child => parentDiv.removeChild(child));
}

const findTargetParent = function(event, cap){
    let target = event.target;
    if(target === cap){ return }
    while(target.parentNode && target.parentNode !== cap){
        target = target.parentNode
    }
    return target
}

const foodObjCheckToggle = function(obj){
    if(obj.checked){
        obj.checked=false;
    }else{
        obj.checked=true;
    }
}

let foods = foodItems;
let groceryListItems = foods.filter(obj => obj.amt > 0);


/////
const renderGroceryList = function(parentDiv){
    

    const listUL = document.createElement("ul");
    listUL.classList.add("list");
    parentDiv.appendChild(listUL);

    groceryListItems.forEach(function(item, index){
        parentDiv.firstElementChild.appendChild(renderListItem(item));
    });

    let btnBox = parentDiv.querySelectorAll(".btn-box")
        .forEach(item => {item.firstElementChild
        .appendChild(renderCheckBox());
        });

    const list = parentDiv.querySelector(".list");
    list.addEventListener("click", function(event){
        let target = findTargetParent(event, list);
        const foodObj = groceryListItems.filter(obj => obj.id === target.id)[0];
        target.querySelector(".check-box")
            .classList.toggle("check-box--chk-ice");
        target.querySelector(".txtbox")
            .classList.toggle("txtbox--done");
        target.classList.toggle(`li--${foodObj.dept}`);
        target.classList.toggle("li-done");
        foodObjCheckToggle(foodObj);
    });
    
    const checkoutBtn = document.querySelector(".checkout");
    checkoutBtn.appendChild(renderCheckoutButton());
    checkoutBtn.addEventListener("click", function(){
        resetPurchasedItems(groceryListItems);
        removePurchasedItemsFromDisplay(listUL);
        // removePurchasedItemsFromDB(groceryListItems);
    });

    
}


document.onload = renderGroceryList(groceryList);

