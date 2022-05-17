const Contenedor = require("./Contenedor");
const Prueba = new Contenedor("./productos.json");

//Agregando objetos
Prueba.save({
    title: "Escuadra",
    price: 123.45,
    thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}).then((objectId) => {
    console.log(`Se agregó el objeto con ID: ${objectId}`);
    Prueba.save({
        title: "Calculadora",
        price: 234.56,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    }).then((objectId) => {
        console.log(`Se agregó el objeto con ID: ${objectId}`);

        Prueba.save({
            title: "Globo Terráqueo",
            price: 345.67,
            thumbnail:
                "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        }).then((objectId) =>
            console.log(`Se agregó el objeto con ID: ${objectId}`)
        );
    });
});

//Obtener un objeto por ID
setTimeout(() => {
    Prueba.getById(2)
    .then((objeto) => {
        console.log(`Se encontró el objeto con ID: 2!`);
        console.log(objeto)
    })
    .catch(() => console.log(`No se encontró el objeto con ID: 2`));
},2000)

//Obtener todos los objetos del archivo
setTimeout(() => {
    Prueba.getAll()
    .then((objetos) => {
        console.log(`Listando todos los objetos!`);
        for(let objeto of objetos){
            console.log(objeto);
        }
    })
    .catch((err) => console.error(err));
},3000)

//Borrar objeto por id
setTimeout(() => {
    Prueba.deleteById(2)
},4000)

//Borrar todos los objetos
setTimeout(() => {
    Prueba.deleteAll()
},5000)
