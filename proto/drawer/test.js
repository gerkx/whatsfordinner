var red = document.querySelector(".red");
var show = document.querySelector(".show");

var Storage = {
  set: function(key, value) {
      localStorage[key] = JSON.stringify(value);
  },
  get: function(key) {
      return localStorage[key] ? JSON.parse(localStorage[key]) : null;
  }
};
// Storage.set("open", false);


if(Storage.get("open") == true){
  show.classList.remove("hide");
}else{
  show.classList.add("hide");
}


  red.addEventListener("click", function(){
    var nxt = this.nextElementSibling;
    var nxtChild = nxt.firstElementChild;
    var max = nxtChild.offsetHeight + "px";
    var drawer = slide;

    if(Storage.get("open") == false){
      Storage.set("open", true);
      
      drawer.open(nxt, max);
      
    }else{
      drawer.close(nxt,max);
      Storage.set("open", false);
      
    }

  
        
    

    
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