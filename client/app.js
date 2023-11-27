const express = require("express");
const path = require("path");

//configurando o ambiente teste

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/mesas.html"));
});

app.get("/geladeira", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/geladeira.html"));
});

app.get("/relatorios", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/relatorios.html"));
});

app.listen(8080, () => {
  console.log("servidor rodando na porta 8080");
});
