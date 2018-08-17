// if('serviceWorker' in navigator) {
//     window.addEventListener("load", () => {
//         navigator.serviceWorker
//             .register("/service-worker.js")
//             .then(reg => console.log("Service Worker: Registered"))
//             .catch(err => console.log(err))
//     })
// }

const baseURL = '';

const sortCats = ["ABC", "Cat", "Date", "Popularity"];
const showCats = [
                    "All", "bakery", "baking",
                    "beverages", "dairy", "frozen", "junk", "meat", 
                    "packaged", "produce", "sundries"
                ];


/////////////////////
// food list stuff //
/////////////////////

const sortKey = page => `${page}Sort`;
const showKey = page => `${page}Show`;

const renderListItem = function(item){
    const listLI = document.createElement("li");
    listLI.classList.add("li");
    let store = JSON.parse(window.sessionStorage.getItem("grocListCart"));
    let done;
    if(store[item._id]) {
        listLI.classList.add("li-done")
        done = "txtbox--done";
    }
    else listLI.classList.add(`li--${item.dept}`);
    listLI.id = item._id;
    listLI.innerHTML = `
    <div class="btn-box">
        <div class="ico ico--xs p-l-5"></div>
    </div>
    <input type="text" name="uniqueID" disabled value="${item.name}" class="txtbox txtbox__title ${done}">
    `
    return listLI;
}

const genCatOption = arr => {
    let cats = arr.splice(0,1);
    arr.shift()
    return arr.map(item => `<option value = "${item}">${capFirstLetter(item)}</option>`)
}

const renderNewItem = function(name){
    const root = document.querySelector("#root");
    const markup = `
    <div class="rec-overlays">
    <div class="lock"></div>
    <div class="rec-groc-pop-alt rec-groc-pop--ice" id="newItemPop">
        <div class="li-banner bg--mint popup-header">
            <input type="text" name="newItemName" value="${name}" id="newTextInput" class="txtbox p-l-10 p-t-5 p-b-5">
        </div>
        <div class="food-details">
            <span class="detail m-t-5">Category:</span>
            <div class="detail">
                <select class="btn btn--mint btn--drop">
                   ${genCatOption(showCats)}
                </select>

            </div>
        </div>
        <div class="button-row ">
            <div class="btn btn--mint m-20" id="newSave">Save</div>
            ${svg.trash("ico ico--slate ico--sm list-trash")}
        </div>
    </div>
    </div>
    `
    root.insertAdjacentHTML("afterbegin", markup)
}

const interactNewItem = () => {
    const overlay = document.querySelector(".rec-overlays");
    const popup = document.querySelector("#newItemPop");
    const parent = overlay.parentElement;
    popup.addEventListener("click", e => {
        const cat = document.querySelector(".btn--drop");
        const input = document.querySelector("#newTextInput");
        const trashIcon = document.querySelector(".list-trash");
        const trashItem = checkLineage(e, trashIcon);
        if(trashItem){
            onList.then(newList => newList.unshift(obj));
            parent.removeChild(overlay).removeChild(popup);
        }
        const save = document.querySelector("#newSave");
        const cleanTxt = escapeHtml(input.value);
        const addedDates = [(new Date()).toJSON()]
        const body = JSON.stringify({ name: cleanTxt, dept: cat.value, amt: 1, addedDates: addedDates });
        if(e.target == save){
            fetch(`${baseURL}/api/food`, {
                method: 'POST',
                body: body,
                headers: { "Content-Type": "application/json" }
            })
                .then( res => res.json())
                .then(obj => {
                    let store = JSON.parse(window.sessionStorage.getItem("grocListCart"));
                    store[obj._id] = false;
                    window.sessionStorage.setItem("grocListCart", JSON.stringify(store));
                    onList.then(newList => newList.unshift(obj));
                    parent.removeChild(overlay).removeChild(popup);
                    groceryList.innerHTML = "";
                    renderGroceryListBlock(groceryList, "grocList");
                })
                .catch(err => {
                    const row = document.querySelector(".button-row");
                    row.insertAdjacentHTML("beforeend", `
                        <span class="p-r-5" style="color:red; text-align: right; font-size: .85em;">Please try again later</span>
                    `)
                })
                
            
        }
    })


}
const renderCheckBox = function(item){
    const checkBox = document.createElement("div");
    checkBox.classList.add("check-box");
    checkBox.classList.add("check-box--border-ice");
    let store = JSON.parse(window.sessionStorage.getItem("grocListCart"));
    const parent = item.parentElement.id;
    if(store[parent]) checkBox.classList.add("check-box--chk-ice")
    return checkBox
}

const renderCheckoutButton = function(){
    const btn = document.createElement("div");
    btn.classList.add("round");
    btn.innerHTML = svg.checkout();
    return btn;
}

const resetPurchasedItemsAmt = function(list){
    const store = JSON.parse(window.sessionStorage.getItem("grocListCart"));
    let trip = "booga";
    
    for(const id in store){
        if(store[id]){
            const idx = list.map(item => item._id).indexOf(id);
            // const purchasedDates = list[idx].purchasedDates;
            const item = list[idx]
            
            list.splice(idx, 1)
            fetch(`${baseURL}/api/food/${id}`, {
                method: 'PUT',
                body: JSON.stringify({amt: 0,  }),
                headers: { "Content-Type": "application/json" }
            })
            .then(res =>{
                notOnList.then(newList => {
                    // console.log(item)
                    newList.unshift(item);
                })
                delete store[id]
                const newStore = JSON.stringify(store);
                window.sessionStorage.setItem("grocListCart", newStore);
                const listUL = document.querySelector(".list")
                removePurchasedItemsFromDisplay(listUL)
            })
            .catch((err) => {
                alert("Unable to connect to server, please try again later")
                    // break;
                
            });

        }
    }

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
    obj.then(data => target.classList.toggle(`li--${data.dept}`));
    target.classList.toggle("li-done");
    return target
}

const renderSearchInput = placeholder => {
    const search = document.createElement("input");
    search.classList.add("txtbox");
    search.classList.add("txtbox--search");
    search.classList.add("p-l-20");
    search.placeholder = placeholder;
    search.list = "searchList";
    return search
}

const renderSearchBlock = () => {
    const div = document.createElement("div");
    div.classList.add("search-box");
    // div.appendChild(renderSearchInput("new item"));
    div.innerHTML = '<input class="txtbox txtbox--search p-l-20" placeholder="new item" list="searchlist">'
    div.insertAdjacentHTML("beforeend", '<datalist id="searchlist"/>')
    div.insertAdjacentHTML("beforeend",svg.plus());
    return div
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

const updateSortStyle = function(div, page){
    let key = sortKey(page);
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

const updateShowStyle = function(div, page){
    let key = showKey(page);
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

function capFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const renderFilterSortSection = (page, arr) => {
    const key = sortKey(page);
    createFilterStateSessionStorage(key, arr);
    let list = document.createElement("div");
    list.classList.add("filter-section");
    list.innerHTML = "<div class='txt--ice'>Sort By:</div>";
    let sortCats = document.createElement("div");
    sortCats.classList.add("filter-cats");
    sortCats.classList.add("filter-sort");
    sortCats.insertAdjacentHTML("beforeend", arr
        .map(item => `<div class="btn-sm m-l-5" id="${item}">${item}</div>`)
        .join(""));
    let kids = Array.from(sortCats.children);
    kids.forEach(item => toggleSortStyle(item, key));
    list.appendChild(sortCats);
    return list
}

const renderFilterShowSection = (page, arr) => {
    const key = showKey(page);
    createFilterStateSessionStorage(key, arr);
    let list = document.createElement("div");
    list.classList.add("filter-section");
    list.innerHTML = "<div class='txt--ice'>Show:</div>";
    let sortCats = document.createElement("div");
    sortCats.classList.add("filter-cats");
    sortCats.classList.add("filter-show");
    sortCats.insertAdjacentHTML("beforeend", arr
        .map(item => `<div class="btn-sm m-l-5" id="${item}">${item}</div>`)
        .join(""));
    let kids = Array.from(sortCats.children);
    kids.forEach(item => toggleSortStyle(item, key));
    list.appendChild(sortCats);
    return list
}

const renderFiltersBlock = (page) => {
    let sort = renderFilterSortSection(page, sortCats);
    let filter = renderFilterShowSection(page, showCats);
    let markup = document.createElement("div");
    markup.classList.add("filter-bar");
    markup.classList.add("hide");
    markup.appendChild(sort);
    markup.appendChild(filter);
    return markup
}

const toggleSortState = (target, page) => {
    let key = sortKey(page);
    let store = Array
        .from(target.parentNode.children)
        .map(div => div.id)
        .reduce((acc, id) => {
            acc[id] = false;
            return acc
        }, {});
    store[target.id] = true;
    store = JSON.stringify(store);
    window.sessionStorage.setItem(key, store)
}

const toggleCartState = target => {
    const id = target.id;
    const state = JSON.parse(window.sessionStorage.getItem("grocListCart"));
    state[id] ? state[id] = false : state[id] = true;
    const newState = JSON.stringify(state)
    window.sessionStorage.setItem("grocListCart", newState)
}

const toggleShowState = (target, page) => {
    let key = showKey(page);
    const prevState = JSON.parse(window.sessionStorage
        .getItem(key))
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
    window.sessionStorage.setItem(key, store)
}

const showSelectedCats = (list, key) => {
    let store = JSON.parse(window.sessionStorage.getItem(key))
    if(store.All){
        return list
    }
    return list.filter(item => store[item.dept])
}

const listSort = key => {
    let store = JSON.parse(window.sessionStorage.getItem(key));
    let sort;
    for (const cat in store){
        if(store[cat]) sort = cat;
    }
    return sort 
}

const listSortFunc = {
    ABC: function(a,b){
        const valA = a.name.toLowerCase();
        const valB = b.name.toLowerCase();
        if(valA < valB) return -1;
        if(valA > valB) return 1;
        return 0
    },
    Cat: function(a,b){
        const valA = a.dept.toLowerCase();
        const valB = b.dept.toLowerCase();
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if(valA < valB) return -1;
        if(valA > valB) return 1;
        if(valA == valB && nameA < nameB) return -1;
        if(valA == valB && nameA > nameB) return 1;
        return 0
    },
    Popularity: function(a,b){
        const popA = a.addedDates.length;
        const popB = b.addedDates.length;
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if(popA !== popB) return popB - popA;
        if(popA == popB && nameA < nameB) return -1;
        if(popA == popB && nameA > nameB) return 1;
        return 0
    },
    Date: function(a,b){
        const dateA = new Date(a.addedDates[0]).getTime();
        const dateB = new Date(b.addedDates[0]).getTime();
        if(dateA !== dateB) return dateB - dateA;
        return 0
    }
};

function fetchQuery(url) {
    const res = fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
    return res
}

function escapeHtml(string){
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(string));
    return clean = div.innerHTML;
}

function createSuggestions(datalist, arr){
    const list = document.querySelector(datalist);
    list.innerHTML = "";
    arr.forEach(item => {
        list.insertAdjacentHTML("beforeend", `<option value = "${item}">`)
    })
    return list
}

///////////////////////
// section renderers //
///////////////////////
const renderSearchSortBlock = (parentDiv, page) =>{
    parentDiv.innerHTML = '<div class="search-filter-bar m-b-5 m-t-5" />'
    parentDiv.firstElementChild.appendChild(renderSearchBlock());
    parentDiv.firstElementChild.insertAdjacentHTML("beforeend", svg.filter());
    parentDiv.appendChild(renderFiltersBlock(page));
    return parentDiv
}

const renderGroceryListBlock = function(parentDiv){
    const listUL = document.createElement("ul");
    listUL.classList.add("list");
    parentDiv.appendChild(listUL);
    onList.then(arr => arr.map(obj => obj._id))
    .then(arr => createFilterStateSessionStorage("grocListCart", arr));
    onList.then(data => {
        return showSelectedCats(data, showKey("grocList"))
        .sort(listSortFunc[listSort(sortKey("grocList"))])
    }).then(list => list.forEach(item => {
        parentDiv.firstElementChild.appendChild(renderListItem(item))
    })).then(() => {
        parentDiv.querySelectorAll(".btn-box")
        .forEach(item => item.firstElementChild.appendChild(renderCheckBox(item)));
    })

}

const renderCheckoutBtn = () =>  {
    const checkoutBtn = document.querySelector(".checkout");
    checkoutBtn.appendChild(renderCheckoutButton());
    checkoutBtn.addEventListener("click", function(){
        
        onList
            .then(arr => resetPurchasedItemsAmt(arr))
            ;
        
    });
}

////////////////////////
// section listenters //
////////////////////////

function interactSearchSortBlock(parentDiv, page){
    parentDiv.addEventListener("click", function(event){
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
            toggleSortState(sortCats, page);
            updateSortStyle(sortCats, page);
            groceryList.innerHTML = "";
            renderGroceryListBlock(groceryList, page);
        }
        const filterShow = document.querySelector(".filter-show");
        const showCats = checkLineage(event, filterShow);
        if(showCats) { 
            toggleShowState(showCats, page);
            updateShowStyle(showCats, page);
            groceryList.innerHTML = "";
            renderGroceryListBlock(groceryList, page);
        }
        const searchBox = document.querySelector(".search-box");
        const inputTxt = checkLineage(event, searchBox);
        if(inputTxt) {
            inputTxt.addEventListener("keyup", (e) => {
                let txt = inputTxt.value.toLowerCase();
                txt = escapeHtml(txt);
                notOnList.then(data => data
                    .filter(obj => obj.name.includes(txt)))
                    .then(matches => matches.map(match => match.name))
                    .then(map => createSuggestions("#searchlist", map))
                if(!e.keyCode || e.keyCode === 13){
                    let txt = inputTxt.value;
                    txt = escapeHtml(txt);
                    textEntry(txt, groceryList, page)
                    inputTxt.value = ""
                }
            });
        }
        const plusIco = document.querySelector("#add");
        const addItem = checkLineage(event, plusIco);
        if(addItem){
            let input = searchBox.firstElementChild;
            let str = input.value.toLowerCase();
            input.value = "";
            textEntry(str, groceryList, page)
        }
    });
}

function textEntry(str, div, pg){
    let txt = str.toLowerCase();
    txt = escapeHtml(txt);
    const notListIndex = promListIndex(notOnList, txt);
    const listIndex = promListIndex(onList, txt);
    if(txt.length > 0) {
        listIndex.then(listIdx => {
            if(listIdx == -1){
                notListIndex.then(notListIdx => {
                    if(notListIdx != -1){
                        addToList(notOnList, notListIdx);
                        div.innerHTML = "";
                        renderGroceryListBlock(div, pg);
                    }else{
                        renderNewItem(txt);
                        interactNewItem();
                    }
                })
            }else{
                alert(`${capFirstLetter(str)} is already on the list!`)
            }
        })
    }
}

function promListIndex(prom, str){
    return prom.then(arr => arr.map(obj => obj.name))
    .then(arr => arr.indexOf(str))
}

function addToList(notListProm, index){
    notListProm.then(arr => {
        const item = arr[index];
        const id = item._id;
        item.amt += 1;
        item.addedDates.unshift((new Date()).toJSON());
        fetch(`${baseURL}/api/food/${id}`, {
            method: 'PUT',
            body: JSON.stringify({amt: item.amt, addedDates: item.addedDates}),
            headers: { "Content-Type": "application/json" }
        })
        .then( () => {
            console.log("whoop")
            arr.splice(index, 1);
            onList.then(newList => {
                newList.unshift(item);
            });
            const store = JSON.parse(window.sessionStorage.getItem("grocListCart"));
            store[id] = false;
            const newStore = JSON.stringify(store)
            window.sessionStorage.setItem("grocListCart", newStore);
        })
        .catch(() => alert(" dayum Unable to connect to the server, please try again later"));
    })
}

function interactGroceryListBlock(parentDiv){
    parentDiv.addEventListener("click", function(event){
        const list = parentDiv.querySelector(".list");
        const target = checkLineage(event, list);
        const foodObj = onList.then(arr => arr.find(obj => obj._id === target.id ))
        listCheckClassToggles(target, foodObj);
        toggleCartState(target);
    })
}

////////////////
// full pages //
////////////////
let onList;
let notOnList;

const shoppingList = () => {
    onList = fetchQuery(`${baseURL}/api/food/?amt=>0`);
    notOnList = fetchQuery(`${baseURL}/api/food?amt=<1`);
    const groceryList = document.getElementById("groceryList");
    const listFilter = document.querySelector("#listFilter");
    renderSearchSortBlock(listFilter, "grocList");
    renderGroceryListBlock(groceryList);
    interactSearchSortBlock(listFilter, "grocList");
    interactGroceryListBlock(groceryList);
    renderCheckoutBtn();
}

shoppingList();

function seeder(){
    let btn = document.querySelector("#seed");
    btn.addEventListener("click", () =>{
        fetchQuery(`${baseURL}/seed`);
    })
}