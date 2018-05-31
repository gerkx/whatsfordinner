// var Storage = {
//     set: function(key, value) {
//         localStorage[key] = JSON.stringify(value);
//     },
//     get: function(key) {
//         return localStorage[key] ? JSON.parse(localStorage[key]) : null;
//     }
// };

function SessStorage(key){
    this.key = key;
}

SessStorage.prototype.set = function(value){
    sessionStorage.setItem(this.key, value);
}

SessStorage.prototype.get = function(){
    return JSON.parse(sessionStorage.getItem(this.key));
}

SessStorage.prototype.remove = function(){
    sessionStorage.removeItem(this.key);
}
