const express = require("express");
const mysql = require("mysql");
const path = require("path");

//configurando o ambiente

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/mostra", (req, res) => {
  res.sendFile(path.join(__dirname, "public/mostra.html"));
});

//configurando conexao mysql

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "root",
  database: "restaurante",
});

//inserção de dados

app.post("/inserir", (req, res) => {
  const { nome, idade } = req.body;

  connection.query(
    "INSERT INTO conta (nome, idade) VALUES (?, ?)",
    [nome, idade],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.json({
        message: "inserido com sucesso",
        insertId: result.insertId,
      });
    }
  );
});

app.get("/mostrar", (req, res) => {
  connection.query("SELECT * FROM conta", (err, results) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
