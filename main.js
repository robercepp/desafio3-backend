const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

class Contenedor {
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

  async productoRandom() {
    const random = parseInt(Math.random() * 3) + 1;
    try {
      const file = await fs.promises.readFile(this.archivo, "utf-8");
      const data = JSON.parse(file);
      const index = data.findIndex((producto) => producto.id == random);
      return data[index] || null;
    } catch (error) {
      console.log("error!: ", error);
    }
  }
}

const catalogo = new Contenedor("./productos.txt");

app.get("/productos", async (req, res) => {
  const resultado = await catalogo.getAll();
  return res.send(resultado);
});

app.get("/productoRandom", async (req, res) => {
  const resultado = await catalogo.productoRandom();
  return res.send(resultado);
});

app.get("/", async (req, res) => {
  const resultado = await catalogo.getAll();
  return res.send(`<h1> 3er desafio del curso de backend - CoderHouse </h1>
  <h3>Alumno: Robertino Cepparo</h3>
  <h3>Comision: 40280</h3>
  <p>por favor sírvase de ingresar a alguno de los siguientes links para ver sus efectos</p>
  <ul>
  <li><a href="https://wistful-hammerhead-secretary.glitch.me/productos">https://wistful-hammerhead-secretary.glitch.me/productos</a></li>
  <li><a href="https://wistful-hammerhead-secretary.glitch.me/productoRandom">https://wistful-hammerhead-secretary.glitch.me/productoRandom</a></li>
  </ul>
  `);
});