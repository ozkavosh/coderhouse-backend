const fs = require("fs/promises");

module.exports = class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(object) {
    const objects = await this.getAll();
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
    return objectsAux;
  }

  async update(object, id) {
    const objects = await this.getAll();
    let objectsAux = objects.filter((objeto) => objeto.id !== Number(id));
    if (objectsAux.length === objects.length || !objects)
      throw new Error('No se encontró el id para actualizar');
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
  }

  async getById(id) {
    const object = await this.getAll();
    let objeto = object.find((objeto_1) => objeto_1.id == id);
    if (!objeto)
      throw new Error('No se encontro el producto');
    return objeto;
  }

  async getAll() {
    try {
      const archivo = await fs
        .readFile(this.fileName, "utf-8");
      return JSON.parse(archivo);
    } catch (err) {
      console.error(`Error al parsear el archivo\n${err}`);
      return [];
    }
  }

  async getRandom() {
    const objetos = await this.getAll();
    const cantidad_objetos = objetos.length;
    let numeroRandom = Math.floor(Math.random() * cantidad_objetos + 1);
    return await this.getById(numeroRandom);
  }

  async deleteById(id) {
    const objects = await this.getAll();
    let objectsAux = objects.filter((object) => object.id !== Number(id));
    if (objectsAux.length === objects.length || !objects)
      throw new Error('No se encontró el id para eliminar');
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
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.fileName, JSON.stringify([]), "utf-8");
      return console.log(`Se eliminaron todos los objetos del archivo!`);
    } catch (err) {
      return console.error(err);
    }
  }
};
