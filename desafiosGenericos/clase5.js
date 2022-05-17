const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

//F
console.log({
    'Nombre': productos.map((producto) => producto.nombre).join(','),
    'Precio': (productos.reduce((acc, element) => {
        acc += element.precio
        return acc
    },0)),
    'PromedioDePrecios': (productos.reduce((acc, element) => {
        acc += element.precio
        return acc
    },0) / productos.length),
    'MenorPrecio': Math.min(...productos.map((producto) => producto.precio)),
    'MayorPrecio': Math.max(...productos.map((producto) => producto.precio))
})

