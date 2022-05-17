class Usuario{
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames(){
        return this.libros.map(libro => {return libro.nombre});
    }
}

let usuario = new Usuario("Jorge", "Perez", [{nombre: 'Libro1', autor: 'Autor1'}, {nombre: 'Libro2', autor: 'Autor2'}], ['perro', 'gato']);

console.log(`Usuario: ${usuario.getFullName()}`);

//Agregamos un libro
usuario.addBook('Libro3', 'Autor3');

console.log(`Libros: ${usuario.getBookNames()}`);

//Agregamos una mascota
usuario.addMascota('conejo');

console.log(`Cantidad de mascotas: ${usuario.countMascotas()}`);