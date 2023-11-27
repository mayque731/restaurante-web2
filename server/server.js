const express = require("express");
const mysql = require("mysql");

const app = express();
// app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Cello-dev",
  database: "restaurante",
});

app.post("/mesa", (req, res) => {
  console.log(req);
  const { numero } = req.body;
  connection.query(
    "INSERT INTO mesa (numero) VALUES (?)",
    [numero],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(201).json({
        message: "Mesa inserida com sucesso",
        id: result.insertId,
      });
    }
  );
});

app.get("/mesa", (req, res) => {
  connection.query("SELECT * FROM mesa", (err, results) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.status(200).json(results);
  });
});

app.post("/pedido", (req, res) => {
  const { idMesa, itens } = req.body;

  let idPedido;
  connection.query(
    "INSERT INTO pedido (id_mesa) VALUES (?)",
    [idMesa],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      idPedido = result.insertId;
    }
  );

  for (const item of itens) {
    connection.query(
      "INSERT INTO produto_pedido (id_pedido, id_produto) VALUES (?)",
      [idPedido, item],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: err });
        }
      }
    );
  }
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
