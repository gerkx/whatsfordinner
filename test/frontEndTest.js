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
    // let parent = body;
    let ul = document.createElement("ul");
    let li01 = document.createElement("li");
    li01.classList.add("boop");
    ul.appendChild(li01)
    let li02 = document.createElement("li");
    li02.classList.add("li-done");
    ul.appendChild(li02);
    it("should remove li's with the class 'li-done", () =>{
        expect(removePurchasedItemsFromDisplay(ul).children.length).to.eql(1);
    });
});

describe("#findTargetParent", () => {
    let tree = document.createElement("div");
    tree.innerHTML = "<div><div /></div>";
    let event = {target: tree.firstElementChild.firstElementChild};
    it("should stop at 1st child of tree", () =>{
        expect(findTargetParent(event, tree)).to.eql(tree.firstElementChild);
    });
});