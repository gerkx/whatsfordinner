var red = document.querySelector(".red");
var show = document.querySelector(".show");

// var Storage = {
//   set: function(key, value) {
//       localStorage[key] = JSON.stringify(value);
//   },
//   get: function(key) {
//       return localStorage[key] ? JSON.parse(localStorage[key]) : null;
//   }
// };
// // Storage.set("open", false);


// if(Storage.get("open") == true){
//   show.classList.remove("hide");
// }else{
//   show.classList.add("hide");
// }
// var stats = new SessStorage("status");
// var redList = red.classList;

// if(redList.contains("boing")){
//   console.log("boop");
// }else{
//   console.log("no boing")
// }

// stats.set(true);
// console.log("now its true", stats.get());


// if(!stats.get()){
//   console.log("nope");
// }else{console.log("yep")}

// stats.remove();
// console.log("is it removed?", stats.get());
// if(!stats.get()){
//   console.log("now now");
// }


red.addEventListener("click", function(){
  var nxt = this.nextElementSibling;
  var nxtClass = nxt.classList;
  var nxtChild = nxt.firstElementChild;
  var max = nxtChild.offsetHeight + "px";
  var drawer = slide;

  if(nxtClass.contains("show")){
    drawer.close(nxt,max);
    nxtClass.remove("show");
  }else{
    drawer.open(nxt, max);
    nxtClass.add("show");
  }


  // if(stats.get() == "false"){
  //   console.log("boop", stats.get());
  //   drawer.open(nxt, max);
  //   stats.set("true");
  // stats.set(true);
  // console.log("... ", stats.get());
    
    
  // }else{
  //   console.log("else", stats.get());
  //   drawer.close(nxt,max);
  //   stats.set("false");
  // }

});

  var slide = {
    open: function(obj, size){
      var classes = '';
      var classList = concatClasses(obj.classList);
      var slide = anime({
        targets: classList,
        maxHeight: size,
        duration: 350,
        easing: [.65, .01, .18, .99]
      });
      return slide;
    },
  close: function(obj, size){
    var classes = '';
    var classList = concatClasses(obj.classList);
    var slide = anime({
      targets: classList,
      maxHeight: 0,
      duration: 350,
      easing: [.65, .01, .18, .99]
    });
    return slide;
  }
}

  function concatClasses(classes){
    classString="";
    classes.forEach(function(str){
      classString+="."+str;
    });
    return classString;
  }