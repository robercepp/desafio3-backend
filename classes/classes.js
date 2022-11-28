const fs = require("fs");

module.exports = class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
  async getAll() {
    try {
      const file = await fs.promises.readFile("./productos.txt", "utf-8");
      const data = JSON.parse(file);
      return data;
    } catch (error) {
      console.log("error!: ", error);
    }
  }
  async getById(id) {
    try {
      const file = await fs.promises.readFile(this.archivo, "utf-8");
      const data = JSON.parse(file);
      const index = data.findIndex((producto) => producto.id == id);
      return data[index] || null;
    } catch (error) {
      console.log("error!: ", error);
    }
  }
};