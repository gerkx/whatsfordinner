const cacheName = "v03";

// const cacheAssets = [
//     "/public/html/shoppingList.html",
//     "svg.js",
//     "listItems.js",
//     "..css/styles.css"
// ];

// call install event
self.addEventListener("install", e => {
    // console.log("Service Worker: Installed");

})

self.addEventListener("activate", e => {
    // console.log("Service Worker: Activated");
    // remove unwanted caches
    e.waitUntil(
        caches.keys().then(names => {
            return Promise.all(
                names.map(name => {
                    if(name !== cacheName){
                        // console.log("Service Worker: Clearing old caches");
                        return caches.delete(name)
                    }
                })
            )
        })
        .catch(err => console.log(err))
    )
});

// Call fetch event
self.addEventListener("fetch", e => {
    const method = e.request.method
    if(method === "GET"){
        e.respondWith(
            fetch(e.request)
                .then(res => {
                    const resClone = res.clone();
                    caches
                        .open(cacheName)
                        .then(cache => cache.put(e.request, resClone));
                    return res
                })
                .catch(err => caches.match(e.request).then(res => res))
        )
    }
    
})