let assert = chai.assert;
let expect = chai.expect;
let spy = sinon.spy;
let stub = sinon.stub;
let fake = sinon.fake;


const seshStorageMocker = function(){
    let storage = {};
    return {
        setItem: function(key, val){
            storage[key] = val.toString();
        },
        getItem: function(key){
            return key in storage ? storage[key] : null;
        },
        removeItem: function(key){
            delete storage[key];
        },
        clear: function(){
            storage = {};
        },
    }
}

const classListMocker = function(id) {
    return {
        id: id,
        classList: {
            list: [],
            contains: function(str){
                if(this.list.indexOf(str) !== -1){
                    return true
                }
                return false
            },
            add: function(item){
                this.list.push(item);
            },
            remove: function(item){
                let idx = this.list.indexOf(item);
                this.list.splice(idx, 1);
            }
        }
    }
}



describe("#renderListItem", () =>{
    let obj;
    beforeEach(() => {
        obj = fake.returns({
            id: "01",
            name: "brocoli",
            dept: "produce",
            amt: 1,
            checked: false,
        })
    });
    it("should create a li", () => expect(renderListItem(obj).nodeName).to.eql("LI"));
    it(`should apply 'li', and 'li--**dept name**)' classes`, () =>{
        assert.isTrue(renderListItem(obj).classList.contains("li", `li--${obj.dept}`));
    });
    it("should have id equal to object id", () =>{
        expect(renderListItem(obj).id).to.eql(obj.id)
    });
});

describe("#renderCheckBox", () =>{
    it("should create div", () => expect(renderCheckBox().nodeName).to.eql("DIV"));
    it("should contain 'check-box' and 'chec-box--border-ice' classes", () =>{
        assert.isTrue(renderCheckBox().classList.contains("check-box", "chec-box--border-ice"));
    });
});

describe("#renderCheckoutButton", () =>{
    it("should create div", () => expect(renderCheckBox().nodeName).to.eql("DIV"));
    it("should contain 'round' class", () =>{
        assert.isTrue(renderCheckoutButton().classList.contains("round"));
    });
    it("should have a SVG child", () => expect(renderCheckoutButton().firstElementChild.nodeName).to.eql("svg"));
});

describe("#resetPurchasedItems", () =>{
    let list = [
        {amt: 1, checked: false,},
        {amt: 2, checked: true,},
    ];
    it("objects with checked flag should have amt set to 0", () => {
        expect(resetPurchasedItems(list)[1].amt).to.eql(0);
    });
    it("objects with checked flag should be reset to false", () => {
        expect(resetPurchasedItems(list)[1].checked).to.eql(false);
    });
});

describe("#removedPurchasedItemsFromDisplay", () => {
    let parent = {
        list:  [".not-done", ".li-done"],
        querySelectorAll: function(key){
            return this.list.filter(item => item == key);

        },
        removeChild: function(item){
            let idx = this.list.indexOf(item);
            this.list.splice(idx, 1);
        },
    }
    it("should remove li's with the class 'li-done", () =>{
        removePurchasedItemsFromDisplay(parent);
        expect(parent.list.length).to.eql(1)
    });
});

describe("#checkLineage", () => {
    it("returns 1st child", () => {
        const parent = {parentNode: null};
        const child = { parentNode: parent };
        const grandchild = { parentNode: child };   
        const event = { target: grandchild };
        const result = checkLineage(event, parent);
        expect(result).to.eql(child)
    });
    it("returns null if not a child of parent", () => {
        const parent = {parentNode: null};
        const root = {parentNode: null}
        const other = {parentNode: root};
        const child = { parentNode: other };
        const grandchild = { parentNode: child };   
        const event = { target: grandchild };
        const result = checkLineage(event, parent);
        expect(result).to.eql(null)
    });
})

describe("#foodObjCheckToggle", () => {
    it("should make false checks turn true", () =>{
        const startsFalse = {checked:false}
        const result = foodObjCheckToggle(startsFalse).checked;
        assert.isTrue(result);
    });
    it("should make true checks turn false", () =>{
        const startsTrue = {checked:true}
        const result = foodObjCheckToggle(startsTrue).checked;
        assert.isFalse(result);
    });
});

describe("#renderSearchBlock", () =>{
    it("should create div", () => expect(renderSearchBlock().nodeName).to.eql("DIV"));
    it("should contain 'search-box' class", () =>{
        assert.isTrue(renderSearchBlock().classList.contains("search-box"));
    });
    it("should have an input for a first child", () =>{
        expect(renderSearchBlock().firstElementChild.nodeName).to.eql("INPUT");
    })
    it("should have a placeholder of 'add a new item' in the input", ()=>{
        const ref = "new item";
        const result = renderSearchBlock().firstElementChild.placeholder;
        assert.equal(ref, result);
    });
    it("should have a div for a second child", () =>{
        const div = "DIV";
        result = renderSearchBlock().children[1].nodeName;
        assert.equal(div, result);
    });
    
});

describe("#renderSearchInput", () => {
    it("should vary the placeholder by arg", () =>{
        const val = "place holder value";
        const result = renderSearchInput(val).placeholder;
        assert.equal(val, result);
    });
});

describe("#renderSearchSortBlock", () => {
    it("should have selector search-filter-bar", () =>{
        const selector = "search-filter-bar";
        let search = document.createElement("div");
        search.id="listFilter";
        const result = renderSearchSortBlock(search).firstElementChild.classList;
        expect(result.contains(selector)).to.be.true
    });

});

describe("#renderFilterSection", () => {
    const key = "renderFilterSection";
    let storageMock;
    beforeEach(function(){
        storageMock = seshStorageMocker();
        Object.defineProperty(window, 'sessionStorage', {value: storageMock});
        
    });
    afterEach(function(){
        window.sessionStorage.removeItem(key);
    });

    it("should return a div", () =>{
        let arr = ["uno", "dos", "tres"];
        let method = renderFilterSortSection(key, arr);
        const div = "DIV";
        const result = method.nodeName;
        expect(result).to.eql(div);
    })
    it("should contain class filter-bar in parent", () => {
        let arr = ["uno", "dos", "tres"];
        let method = renderFilterSortSection(key, arr);
        const sel = "filter-section";
        const result = method.classList.contains(sel);
        assert.isTrue(result);
    });
    it("1st child should be div", () => {
        let arr = ["uno", "dos", "tres"];
        let method = renderFilterSortSection(key, arr);
        const div = "DIV";
        const result = method.lastElementChild.nodeName;
        expect(result).to.eql(div);
    });
    it("1st child should have class txt--ice", () => {
        let arr = ["uno", "dos", "tres"];
        let method = renderFilterSortSection(key, arr);
        const sel = "txt--ice";
        const result = method.firstElementChild.classList.contains(sel);
        assert.isTrue(result);
    });
    it("1st child should have Sort by text", () => {
        let arr = ["uno", "dos", "tres"];
        let method = renderFilterSortSection(key, arr);
        const result = method.firstElementChild.textContent;
        expect(result).to.eql("Sort By:");
    });
    it("should return a list of divs that match arr input", () => {
        let arr = ["uno", "dos", "tres"];
        let method = renderFilterSortSection(key, arr);
        const result = Array.from(method.lastElementChild.children);
        expect(result[arr.length-1].textContent).to.eql(arr[arr.length-1]);
    });
    it("the array divs should have btn-sm m-l-5 classes", () => {
        let arr = ["uno", "dos", "tres"];
        let method = renderFilterSortSection(key, arr);
        const result = method.lastElementChild.lastElementChild.classList.contains("btn-sm", "m-l-5");
        assert.isTrue(result);
    });
});

describe("#renderFiltersBlock", ()=>{
    let func = renderFiltersBlock();
    it("creates a div", () => {
        const div = "DIV";
        expect(func.nodeName).to.eql(div);
    });
    it("1st div should have filter-bar class", () => {
        const txt = "filter-bar";
        const result = func.classList.contains(txt);
        assert.isTrue(result);
    });
    it("should have two divs for children", () => {
        result = func.childElementCount;
        expect(result).to.eql(2)
    });

});

describe("#createFilterStateSessionStorage", function(){
    let storageMock;
    beforeEach(function(){
        storageMock = seshStorageMocker();
        Object.defineProperty(window, 'sessionStorage', {value: storageMock});
    });
    afterEach(function(){
        window.sessionStorage.removeItem("grocSortState");
    });
    it("creates a non existent sesh storage obj", () => {
        const arr = ["beep", "boop", "bleep"];
        createFilterStateSessionStorage("grocSortState", arr);
        const result = JSON.parse(window.sessionStorage.getItem("grocSortState"));
        assert.isTrue(result[arr[0]]);
    });
});

describe("#toggleSortStyle", () => {
    const arr = ["beep", "boop", "bleep"];
    const key = "sortState";
    let storageMock;
    beforeEach(function(){
        storageMock = seshStorageMocker();
        Object.defineProperty(window, 'sessionStorage', {value: storageMock});
        createFilterStateSessionStorage(key, arr);

    });
    afterEach(function(){
        window.sessionStorage.removeItem(key);
    });
    it("adds style if storage is true", function() {
        let div = classListMocker(arr[0]);
        toggleSortStyle(div, key);
        assert.isTrue(div.classList.contains("btn--mint"));
    });
});

describe("#toggleSortState", () => {
    const page = "sortState"
    const key = "sortStateSort";
    const arr = ["hip", "herp", "derp"];
    const target = {
        parentNode: {
            children: arr.reduce((acc, item) => {
                acc.push({id: item})
                return acc
            }, [])
        },
        id: arr[1],
    };
    let storageMock;
    beforeEach(function(){
        storageMock = seshStorageMocker();
        Object.defineProperty(window, 'sessionStorage', {value: storageMock});
        createFilterStateSessionStorage(key, arr);
    });
    afterEach(function(){
        window.sessionStorage.removeItem(key);
    });

    it("sets clicked state to true", () => {
        toggleSortState(target, page);
        const result = JSON.parse(window.sessionStorage.getItem(key));
        assert.isTrue(result[arr[1]])
    })

    it("sets unclicked states to false", () => {     
        toggleSortState(target, page);
        const result = JSON.parse(window.sessionStorage.getItem(key));
        assert.isFalse(result[arr[0]])  
    })

});

describe("#updateSortStyle", () =>{
    const page = "sortState";
    const key = "sortStateSort";
    const arr = ["uno", "dos", "tres"];
    let storageMock;
    beforeEach(function(){
        storageMock = seshStorageMocker();
        Object.defineProperty(window, 'sessionStorage', {value: storageMock});
        createFilterStateSessionStorage(key, arr);
    });
    afterEach(function(){
        window.sessionStorage.removeItem(key);
    });
    it("adds btn--mint to states that are true", () => {
        let kids = arr.map(div => classListMocker(div))
        const div = { parentNode: { children: kids } };
        updateSortStyle(div, page);
        const result = div.parentNode.children[0].classList.contains("btn--mint");
        assert.isTrue(result)
    });
    it("removes class from states that are false", () =>{
        let kids = arr.map(div => classListMocker(div))
        kids.forEach(kid => kid.classList.add("btn--mint"))
        const div = { parentNode: { children: kids } };
        updateSortStyle(div, page);
        const result = div.parentNode.children[1].classList.contains("btn--mint");
        assert.isFalse(result)
    });
})

describe("#toggleShowState", () => {
    const page = "showState";
    const key = "showStateShow";
    const arr = ["All", "Dogs", "Cats"];
    const target = {
        parentNode: {
            children: arr.reduce((acc, item) => {
                acc.push({id: item})
                return acc
            }, [])
        },
        id: arr[0],
    };
    // console.log(target.id)
    let storageMock;
    beforeEach(function(){
        storageMock = seshStorageMocker();
        Object.defineProperty(window, 'sessionStorage', {value: storageMock});
        createFilterStateSessionStorage(key, arr);
    });
    afterEach(function(){
        window.sessionStorage.removeItem(key);
    });
    it("sets other cats to false with All click", () => {
        toggleShowState(target, page)
        const result = JSON.parse(window.sessionStorage.getItem(key))
        assert.isFalse(result[arr[1]]);
    });
    it("sets All to true when clicked", () => {
        toggleShowState(target, page)
        const result = JSON.parse(window.sessionStorage.getItem(key))
        assert.isTrue(result[arr[0]]);
    });
    it("sets all other cats false other than target if all was prev", () => {
        let dogTarg = target;
        dogTarg.id = arr[1];
        toggleShowState(dogTarg, page);
        const result = JSON.parse(window.sessionStorage.getItem(key));
        assert.isFalse(result[arr[0]]);
        assert.isFalse(result[arr[2]]);
        assert.isTrue(result[arr[1]]);
    });
    it("preserves other states if All not prev", () => {
        let newStore = JSON.parse(window.sessionStorage.getItem(key));
        newStore.All = false;
        newStore.Dogs = true;
        window.sessionStorage.setItem(key, JSON.stringify(newStore));
        let catTarg = target;
        catTarg.id = arr[2];
        toggleShowState(catTarg, page);
        const result = JSON.parse(window.sessionStorage.getItem(key));
        assert.isTrue(result[arr[1]]);
        assert.isTrue(result[arr[2]]);
        assert.isFalse(result[arr[0]]);
    })
});

describe("#showSelectedCats", () => {
    const key = "showState";
    const arr = ["All", "Dogs", "Cats"];
    let listItems = [
        { name: "Rex", dept: arr[1], },
        { name: "Spot", dept: arr[1], },
        { name: "Belle", dept: arr[2], },
    ]

    let storageMock;
    beforeEach(function(){
        storageMock = seshStorageMocker();
        Object.defineProperty(window, 'sessionStorage', {value: storageMock});
        createFilterStateSessionStorage(key, arr);
    });
    afterEach(function(){
        window.sessionStorage.removeItem(key);
    });

    it("returns the same list if All is selected", () => {
        const result = showSelectedCats(listItems, key);
        expect(result.length).to.eql(listItems.length)
    });
    it("returns only items that are true", () => {
        const dogsRule = JSON.stringify({All: false, Dogs: true, Cats: false})
        window.sessionStorage.setItem(key, dogsRule);
        const result = showSelectedCats(listItems, key);
        expect(result.length).to.eql(2)
        const retDepts = result.map(item => item.dept);
        expect(retDepts.indexOf(arr[2])).to.eql(-1)
    })
});

describe("#listSortABC", () => {
    it("sorts in alph order", () => {
        let arr = [
            {name: "Pat"},
            {name: "Amanda"},
            {name: "laszlo"},
            {name: "Abby"},
        ];
        let result = arr.sort(listSortABC);
        expect(result[0].name).to.eql("Abby");
        expect(result[result.length-1].name).to.eql("Pat");
    })
});

describe("#listSortCat", () => {
    it("sort by dept order", () => {
        const arr = [
            {name: "Amanda", dept: "Mom"},
            {name: "laszlo", dept: "kid"},
            {name: "Abby", dept: "kid"},
            {name: "Pat", dept: "dad"},
        ];
        const result = arr.sort(listSortCat);
        expect(result[0].name).to.eql("Pat");
        expect(result[result.length-1].name).to.eql("Amanda");
        expect(result[1].name).to.eql("Abby")
    })
})

describe("#listSortPop", () => {
    it("sorts by number of times added", () =>{
        const arr = [
            {name: "Pat",added: [1,1]},
            {name: "Amanda", added: [1,1]},
            {name: "Laszlo", added: [1,1,1,1]}
        ];
        const result = arr.sort(listSortPop);
        expect(result[0].name).to.eql("Laszlo");
        expect(result[1].name).to.eql("Amanda");
        expect(result[2].name).to.eql("Pat");
    });
})

describe("#listSortDate", () => {
    it("sorts by date added", () => {
        const arr = [
            {name: "Pat",added: [new Date(2018, 04, 01)]},
            {name: "Amanda", added: [new Date(2018, 05, 02)]},
            {name: "Laszlo", added: [new Date(2018, 07, 08)]}
        ];
        const result = arr.sort(listSortDate);
        expect(result[0].name).to.eql("Laszlo");
        expect(result[1].name).to.eql("Amanda");
        expect(result[2].name).to.eql("Pat");
    })
})