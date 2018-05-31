var animals = [
    {name: "Jim", species: "dog"},
    {name: "Rob", species: "cat"},
    {name: "Belle", species: "cat"},
    {name: "Abby", species: "dog"},
    {name: "Fluffy", species: "rabbit"}
]

// var names = animals.map(function(animal){
//     return animal.name;
// })

var names = animals
        .filter(animal => animal.species === "cat")
        .map(animal => animal.name + " is a " + animal.species)

console.log(names);