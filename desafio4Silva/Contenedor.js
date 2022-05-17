const fs = require("fs/promises");

module.exports = class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  save(object) {
    return this.getAll().then((objects) => {
      let currentObjectId = objects.length + 1;

      let objectsAux = [...objects, { ...object, id: currentObjectId }];

      fs.writeFile(this.fileName, JSON.stringify(objectsAux, null, 4), "utf-8")
        .then(() => {
          console.log(`Archivo guardado con éxito!`);
        })
        .catch((err) => {
          console.error(err);
          console.log(`No se pudo guardar el archivo!`);
        });

      return currentObjectId;
    });
  }

  update(object, id) {
    return this.getAll().then((objects) => {
      let objectsAux = objects.filter((objeto) => objeto.id !== Number(id));

      if(objectsAux.length === objects.length || !objects) throw new Error('No se encontró el id para actualizar');

      objectsAux.push({ ...object, id: Number(id) });
      objectsAux.sort((a, b) => a.id - b.id);

      fs.writeFile(this.fileName, JSON.stringify(objectsAux, null, 4), "utf-8")
        .then(() => {
          console.log(`Archivo actualizado con éxito!`);
        })
        .catch((err) => {
          console.error(err);
          console.log(`No se pudo actualizar el archivo!`);
        });

        return objectsAux;
    });
  }

  getById(id) {
    return this.getAll()
      .then((object) => {
        let objeto = object.find((objeto) => objeto.id == id);
        if(!objeto)throw new Error('No se encontro el producto');
        return objeto;
      })
  }

  getAll() {
    return fs
      .readFile(this.fileName, "utf-8")
      .then((archivo) => JSON.parse(archivo))
      .catch((err) => {
        console.error(`Error al parsear el archivo\n${err}`);
        return [];
      });
  }

  getRandom() {
    return this.getAll()
      .then((objetos) => objetos.length)
      .then((cantidad_objetos) => {
        let numeroRandom = Math.floor(Math.random() * cantidad_objetos + 1);
        return this.getById(numeroRandom);
      });
  }

  deleteById(id) {
    return this.getAll()
      .then((objects) => {
        let objectsAux = objects.filter((object) => object.id !== Number(id));

        if(objectsAux.length === objects.length || !objects) throw new Error('No se encontró el id para eliminar');

        for (let i = 0; i < objectsAux.length; i++) {
            objectsAux[i].id = i + 1;
        }

        fs.writeFile(
          this.fileName,
          JSON.stringify(objectsAux, null, 4),
          "utf-8"
        )
          .then(() => {
            console.log(
              `Se eliminó el objeto con id ${id} del archivo ${this.fileName}`
            );
          })
          .catch(() => console.error(`Error al eliminar el objeto`));

          return objectsAux;
      })
  }

  deleteAll() {
    return fs.writeFile(this.fileName, JSON.stringify([]), "utf-8")
      .then(() => console.log(`Se eliminaron todos los objetos del archivo!`))
      .catch((err) => console.error(err));
  }
};
