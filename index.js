const axios = require("axios");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const chalk = require("chalk");

const app = express();

app.use(express.static("static"));

app.get("/", async (req, res) => {
  const resp = await axios.get("https://randomuser.me/api/?results=20");
  const data = resp.data.results;

  const usuarios = data.map((x) => {
    const usuario = {
      id: uuidv4().slice(-6),
      nombre: x.name.first,
      apellido: x.name.last,
      fecha_registro: moment().format("MMMM Do YYYY, h:mm:ss a"),
    };
    return usuario;
  });

  const usuariosFormateados = usuarios.map((x, i) => {
    return `${i + 1}. Nombre: ${x.nombre} - Apellido: ${x.apellido} - ID: ${
      x.id
    } - Timestamp: ${x.fecha_registro}`;
  });
  res.send(usuariosFormateados.join("<br />"));

  console.log(chalk.blue.bgWhite(usuariosFormateados.join("\n")));
});

//Server
app.listen(5050, () => {
  console.log("Server up en puerto 5050");
});
