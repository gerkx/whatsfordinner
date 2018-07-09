let assert = chai.assert;
let expect = chai.expect;
let spy = sinon.spy;
let stub = sinon.stub;
let fake = sinon.fake;

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
    let ul = document.createElement("ul");
    ul.innerHTML = "<li class='not-done' /><li class='li-done' />";
    it("should remove li's with the class 'li-done", () =>{
        expect(removePurchasedItemsFromDisplay(ul).children.length).to.eql(1);
    });
});

// better way of structuring tests ===>
describe("#findTargetParent", () => {
    it("should stop at 1st child of tree", () => {
        // Arrange
        const parent = { parentNode: undefined };
        const child = { parentNode: parent };
        const grandchild = { parentNode: child };
        const tree = { parent }    
        const event = { target: grandchild };
        // Act
        const result = findTargetParent(event, tree)
        // Assert
        expect(result).to.eql(parent);
      });
});

describe("#filterClickCallbacks", () => {
    it("returns callback fn from same target index in array", () => {
        const callback = () => "beep!!!";
        const arr = [{target: "boop"}, {target: "beep", callback: callback}, {target: "blerp"}];
        const child = "beep";
        const grandchild = {parentNode: child};
        const event = {target: grandchild};

        const result = filterClickCallbacks(event, arr);
        
        expect(result).to.eql(callback());
    });

    it("returns undef if target isn't in objArr", () => {
        const arr = [{target: "boop"}, {target: "beep"},{target: "blerp"}];
        const parent = {parentNode: undefined};
        const child = {parentNode: parent};
        const grandchild = {parentNode: child};
        const event = {target: grandchild};

        const result = filterClickCallbacks(event, arr);
        
        assert.isUndefined(result);
    });

    it("returns undef if callback isn't in obj", () => {
        const arr = [{target: "boop"}, {target: "beep"},{target: "blerp"}];
        const child = "beep";
        const grandchild = {parentNode: child};
        const event = {target: grandchild};

        const result = filterClickCallbacks(event, arr);

        assert.isUndefined(result);
    });
});

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
    let arr = ["one", "two", "three"];
    let method = renderFilterSortSection(arr, "Sort by:", "filter-sort")
    it("should return a div", () =>{
        const div = "DIV";
        const result = method.nodeName;
        expect(result).to.eql(div);
    })
    it("should contain class filter-bar in parent", () => {
        const sel = "filter-sort";
        const result = method.classList.contains(sel);
        assert.isTrue(result);
    });
    it("1st child should be div", () => {
        const div = "DIV";
        const result = method.firstElementChild.nodeName;
        expect(result).to.eql(div);
    });
    it("1st child should have class txt--ice", () => {
        const sel = "txt--ice";
        const result = method.firstElementChild.classList.contains(sel);
        assert.isTrue(result);
    });
    it("1st child should have Sort by text", () => {
        const text = "Sort by:";
        const result = method.firstElementChild.textContent;
        expect(text).to.eql(result);
    });
    it("should return a list of divs that match arr input", () => {
        const result = method.lastElementChild.textContent;
        expect(result).to.eql(arr[arr.length-1]);
    });
    it("the array divs should have btn-sm m-l-5 classes", () => {
        const result = method.lastElementChild.classList.contains("btn-sm", "m-l-5");
        assert.isTrue(result);
    });
    it("if 2nd argument passed the first child div will contain it", () => {
        const txt = "boop"
        const result = renderFilterSortSection(arr, txt).firstElementChild.textContent;
        expect(result).to.eql(txt)
    })
    it("if 3rd arg passed the block css will have it as sel", () => {
        const txt = "boop"
        const sel = "tweedle"
        const result = renderFilterSortSection(arr, txt, sel).classList.contains(sel);
        assert.isTrue(result);
    })
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

const storageMocker = function(){
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


describe("#createFilterStateSessionStorage", function(){
    let storageMock;
    beforeEach(function(){
        storageMock = storageMocker();
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
    let storageMock;
    beforeEach(function(){
        storageMock = storageMocker();
        Object.defineProperty(window, 'sessionStorage', {value: storageMock});
    });
    afterEach(function(){
        window.sessionStorage.removeItem("grocSortState");
    });
    it("adds style if storage is true", function() {
        const arr = ["beep", "boop", "bleep"];
        createFilterStateSessionStorage("grocSortState", arr);
        let div = {
            id: arr[0],
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
                }
            }
        }
        toggleSortStyle(div, "grocSortState");
        assert.isTrue(div.classList.contains("btn--mint"));
    });
})