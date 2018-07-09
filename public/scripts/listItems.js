

// ///////////////////////
// // date picker setup //
// ///////////////////////
// var today = new Date();
// var prevDate = new Date("Jun 07 2018");

// var field = document.getElementById("datepicker")
// if(field){
//     field.innerHTML = today.toDateString().split(" ", 3).join(" ");

// }

// let picker = new Pikaday({
//     field: field,
//     trigger: field,
//     firstDay: 1,
//     minDate: today,
//     maxDate: new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000),
//     yearRange: [
//         today.getFullYear(), 
//         new Date(today.getFullYear() + 1)
//     ],
//     onSelect: function(date){
//         prevDate = picker;
//         var noYear = (prevDate.toString()).split(" ", 3).join(" ");

//         console.log(noYear);
//         console.log("boop: ", prevDate.toString());
//         field.innerHTML = noYear;
//     }
// });

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


// trashSVG.forEach(trash => trash.innerHTML = svg.trash("ico--slate"));
// foodCloseSVG.forEach(x => x.innerHTML = svg.remove("rmv-x stroke--slate"));
// navLogoSVG.innerHTML = svg.logo("fill--cloud");
// navBurgerSVG.innerHTML = svg.burger("mini-burger stroke--cloud");

///////////////
// Page divs //
///////////////
const groceryList = document.getElementById("groceryList");
const listFilter = document.querySelector("#listFilter");

/////////////////////
// food list stuff //
/////////////////////

const renderListItem = function(item){
    const listLI = document.createElement("li");
    listLI.classList.add("li");
    listLI.classList.add(`li--${item.dept}`);
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

const resetPurchasedItems = function(list){
    list.filter((obj, index) => obj.checked == true)
        .forEach(obj => {
            obj.amt = 0; 
            obj.checked = false;
        });
    return list
}

const removePurchasedItemsFromDisplay = function(parentDiv){
    let doneItems = parentDiv.querySelectorAll(".li-done")
        .forEach(child => parentDiv.removeChild(child));
    return parentDiv
}

const findTargetParent = (event, top) => {
    let target = event.target;
    if(target === top){ return }
    while(target.parentNode && target.parentNode !== top){
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
    return obj
}

function listCheckClassToggles(target, obj){
    target.querySelector(".check-box")
        .classList.toggle("check-box--chk-ice");
    target.querySelector(".txtbox")
        .classList.toggle("txtbox--done");
    target.classList.toggle(`li--${obj.dept}`);
    target.classList.toggle("li-done");

    return target
}

const renderSearchInput = placeholder => {
    const search = document.createElement("input");
    search.classList.add("txtbox");
    search.classList.add("txtbox--search");
    search.classList.add("p-l-20");
    search.placeholder = placeholder;
    return search
}

const renderSearchBlock = () => {
    const div = document.createElement("div");
    div.classList.add("search-box");
    div.appendChild(renderSearchInput("new item"));
    const searchIcon = document.createElement("div");
    div.insertAdjacentHTML("beforeend",svg.search());
    return div
}

const groceryItemStatus =  function(event){
    let target = findTargetParent(event, this);
    const foodObj = groceryListItems.find(obj => obj.id === target.id);
    listCheckClassToggles(target, foodObj);
    foodObjCheckToggle(foodObj);
}

// let filtros = ["produce"];
// filter(obj => filtros.indexOf(obj.dept) != -1)
let foods = foodItems;
let groceryListItems = foods.filter(obj => obj.amt > 0);
const sortCats = ["ABC", "Cat", "Date", "Popularity"];
const showCats = [
                    "All", "Bakery", "Dairy", "Frozen", "Meat", 
                    "Packaged", "Produce", "Sundries"
                ];

const createFilterStateSessionStorage = (key, arr) => {
    if(!window.sessionStorage[key]){
        let obj = arr.reduce((acc, item) => {
            acc[item] = false;
            return acc
        }, {});
        obj[arr[0]] = true;
        window.sessionStorage.setItem(key, JSON.stringify(obj));
    }
}

const toggleSortStyle = function(div, key){
    const seshStore = JSON.parse(window.sessionStorage.getItem(key));
    if(seshStore[div.id]){
        div.classList.add("btn--mint");
    }
}

const renderFilterSortSection = (arr, title, selector) => {
    createFilterStateSessionStorage(title, arr);
    let list = document.createElement("div");
    list.classList.add(selector);
    list.innerHTML = `<div class='txt--ice'>${title}</div>`;
    list.insertAdjacentHTML("beforeend", arr
        .map(item => `<div class="btn-sm m-l-5" id="${item}">${item}</div>`)
        .join(""));
    let kids = Array.from(list.children);
    kids.forEach(item => toggleSortStyle(item, title))
    return list
}

const renderFiltersBlock = () => {
    let sort = renderFilterSortSection(sortCats, "Sort by:", "filter-sort");
    let filter = renderFilterSortSection(showCats, "Show:", "filter-show");
    let markup = document.createElement("div");
    markup.classList.add("filter-bar");
    markup.classList.add("hide");
    markup.appendChild(sort);
    markup.appendChild(filter);
    
    return markup
}


const filterClickCallbacks = (event, objArr) => {
    let target = event.target;
    const objTargets = objArr.map(obj => obj.target);
    while(target.parentNode && objTargets.indexOf(target) == -1){        
        target = target.parentNode
    }
    let arrIndex = objTargets.indexOf(target);
    if(arrIndex !== -1){
        const obj = objArr[arrIndex];
        if(obj.callback){
            return obj.callback()
        }
    }
}







///////////////////////
// section renderers //
///////////////////////

const renderSearchSortBlock = (listFilter) =>{
    // createFilterSortStateSessionStorage("grocSortState");
    listFilter.innerHTML = '<div class="search-filter-bar m-b-5 m-t-5" />'
    listFilter.firstElementChild.appendChild(renderSearchBlock());
    listFilter.firstElementChild.insertAdjacentHTML("beforeend", svg.filter());
    listFilter.appendChild(renderFiltersBlock());

    listFilter.addEventListener("click", function(event){
        const filterBlock = document.querySelector(".filter-bar");
        const filterIcon = document.querySelector(".filter-block");
        const targCallbacks = [
            {
                // filter button
                target: document.querySelector(".filter-block"),
                callback: function(){
                    filterIcon.classList.toggle("ico--ice")
                    filterIcon.classList.toggle("ico--mint")
                    filterBlock.classList.toggle("hide");
                }
            },
        ];

        filterClickCallbacks(event, targCallbacks);
    });

    return listFilter
}




const renderGroceryListBlock = function(parentDiv){
    const listUL = document.createElement("ul");
    listUL.classList.add("list");
    parentDiv.appendChild(listUL);
    groceryListItems.forEach(function(item, index){
        parentDiv.firstElementChild.appendChild(renderListItem(item));
    });

    parentDiv.querySelectorAll(".btn-box")
        .forEach(item => item.firstElementChild.appendChild(renderCheckBox()));

    parentDiv.querySelector(".list")
        .addEventListener("click", function(event){
            let target = findTargetParent(event, this);
            const foodObj = groceryListItems.find(obj => obj.id === target.id);
            listCheckClassToggles(target, foodObj);
            foodObjCheckToggle(foodObj);
        });

    const checkoutBtn = document.querySelector(".checkout");
    checkoutBtn.appendChild(renderCheckoutButton());
    checkoutBtn.addEventListener("click", function(){
        resetPurchasedItems(groceryListItems);
        removePurchasedItemsFromDisplay(listUL);
    });
    
}



renderSearchSortBlock(listFilter);



renderGroceryListBlock(groceryList);
// searchSort(groceryList);
