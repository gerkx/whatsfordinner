let foods = foodItems;
let groceryListItems = foods.filter(obj => obj.amt > 0);
const sortCats = ["ABC", "Cat", "Date", "Popularity"];
const showCats = [
                    "All", "bakery", "dairy", "frozen", "meat", 
                    "packaged", "produce", "sundries"
                ];
const grocSortKey = "Sort by:";
const grocDispKey = "Show:";


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
    list.filter(obj => obj.checked == true)
        .forEach(obj => {
            obj.amt = 0; 
            obj.checked = false;
        });
    return list
}

const removePurchasedItemsFromDisplay = function(parentDiv){
    return parentDiv.querySelectorAll(".li-done")
        .forEach(child => parentDiv.removeChild(child));
}

const checkLineage = (event, parent) => {
    let target = event.target;
    while(target != null){
        if(target.parentNode == parent){
            return target
        }
        target = target.parentNode
    }
    return null
}

const foodObjCheckToggle = function(obj){
    obj.checked ? obj.checked= false : obj.checked = true;
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
    div.insertAdjacentHTML("beforeend",svg.search());
    return div
}

const groceryItemStatus =  function(event){
    let target = checkLineage(event, this);
    const foodObj = groceryListItems.find(obj => obj.id === target.id);
    listCheckClassToggles(target, foodObj);
    foodObjCheckToggle(foodObj);
}

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

const updateSortStyle = function(div, key){
    let store = JSON.parse(window.sessionStorage.getItem(key));
    let arr = Array.from(div.parentNode.children);
    arr.forEach(div => {
        div.classList.remove("btn--mint");
        if(store[div.id]){
            div.classList.add("btn--mint")
        }
    });
    return arr
}

const renderFilterSortSection = (arr, title, selector, page) => {
    let key = page.toLowerCase() + title.charAt(0).toUpperCase() + title.substr(1);
    createFilterStateSessionStorage(key, arr);
    let list = document.createElement("div");
    list.classList.add("filter-section");
    list.innerHTML = `<div class='txt--ice'>${title}</div>`;
    let sortCats = document.createElement("div");
    sortCats.classList.add("filter-cats");
    sortCats.classList.add(selector);
    sortCats.insertAdjacentHTML("beforeend", arr
        .map(item => `<div class="btn-sm m-l-5" id="${item}">${item}</div>`)
        .join(""));
    let kids = Array.from(sortCats.children);
    kids.forEach(item => toggleSortStyle(item, key));
    list.appendChild(sortCats);
    return list
}

const renderFiltersBlock = (page) => {
    let sort = renderFilterSortSection(sortCats, "Sort by:", "filter-sort", page);
    let filter = renderFilterSortSection(showCats, "Show:", "filter-show", page);
    let markup = document.createElement("div");
    markup.classList.add("filter-bar");
    markup.classList.add("hide");
    markup.appendChild(sort);
    markup.appendChild(filter);
    return markup
}

const toggleSortState = (target, storeKey) => {
    let store = Array
        .from(target.parentNode.children)
        .map(div => div.id)
        .reduce((acc, id) => {
            acc[id] = false;
            return acc
        }, {});
    store[target.id] = true;
    store = JSON.stringify(store);
    window.sessionStorage.setItem(storeKey, store)
}

const toggleShowState = (target, storeKey) => {
    const prevState = JSON.parse(window.sessionStorage
        .getItem(storeKey))
    let store = Array
        .from(target.parentNode.children)
        .map(div => div.id)
        .reduce((acc, id) => {
            if(target.id === "All" || prevState.All === true){
                acc[id] = false;
                acc[target.id] = true;
                return acc
            }
            prevState[id] ? acc[id] = true : acc[id] = false;
            !prevState[target.id] ? acc[target.id] = true : acc[target.id] = false;
            return acc
        }, {});
    store = JSON.stringify(store);
    window.sessionStorage.setItem(storeKey, store)
}

const showSelectedCats = (list, key) => {
    let store = JSON.parse(window.sessionStorage.getItem(key))
    if(store.All){
        return list
    }
    return list.filter(item => store[item.dept])
}


///////////////////////
// section renderers //
///////////////////////
const renderSearchSortBlock = (listFilter, page) =>{
    let lcPage = page.toLowerCase();
    listFilter.innerHTML = '<div class="search-filter-bar m-b-5 m-t-5" />'
    listFilter.firstElementChild.appendChild(renderSearchBlock());
    listFilter.firstElementChild.insertAdjacentHTML("beforeend", svg.filter());
    listFilter.appendChild(renderFiltersBlock(page));

    listFilter.addEventListener("click", function(event){
        const filterBar = document.querySelector(".filter-bar");
        const filterIcon = document.querySelector(".filter-icon");
            
        const filterDisp = checkLineage(event, filterIcon);
        if(filterDisp){
            filterIcon.classList.toggle("ico--ice");
            filterIcon.classList.toggle("ico--mint");
            filterBar.classList.toggle("hide");
        }
        
        const filterSort = document.querySelector(".filter-sort");
        const sortCats = checkLineage(event, filterSort);
        if(sortCats) { 
            toggleSortState(sortCats, lcPage + grocSortKey);
            updateSortStyle(sortCats, lcPage + grocSortKey);
        }
        const filterShow = document.querySelector(".filter-show");
        const showCats = checkLineage(event, filterShow);
        if(showCats) { 
            toggleShowState(showCats, lcPage + grocDispKey);
            updateSortStyle(showCats, lcPage + grocDispKey);
        }
    });

    return listFilter
}

const renderGroceryListBlock = function(parentDiv){
    let key = "groc"+grocDispKey;
    let dispList = showSelectedCats(groceryListItems, key);
    const listUL = document.createElement("ul");
    listUL.classList.add("list");
    parentDiv.appendChild(listUL);
    dispList.forEach(function(item){
        parentDiv.firstElementChild.appendChild(renderListItem(item));
    });

    parentDiv.querySelectorAll(".btn-box")
        .forEach(item => item.firstElementChild.appendChild(renderCheckBox()));

    parentDiv.querySelector(".list")
        .addEventListener("click", function(event){
            let target = checkLineage(event, this);
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



renderSearchSortBlock(listFilter, "groc");
renderGroceryListBlock(groceryList);
// searchSort(groceryList);
