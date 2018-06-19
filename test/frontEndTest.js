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

describe("#foodObjChekToggle", () => {
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

describe("#renderSearchBar", () =>{
    it("should create div", () => expect(renderSearchBar().nodeName).to.eql("DIV"));
    it("should contain 'search-box' class", () =>{
        assert.isTrue(renderSearchBar().classList.contains("search-box"));
    });
    it("should have an input for a first child", () =>{
        expect(renderSearchBar().firstElementChild.nodeName).to.eql("INPUT");
    })
    it("should have a placeholder of 'add a new item' in the input", ()=>{
        const ref = "add a new item";
        const result = renderSearchBar().firstElementChild.placeholder;
        assert.equal(ref, result);
    });
    // it("should have a div for a second child", () =>{

    // })
    
});

describe("#renderSearchInput", () => {
    it("should vary the placeholder by arg", () =>{
        const val = "place holder value";
        const result = renderSearchInput(val).placeholder;
        assert.equal(val, result);
    });
});