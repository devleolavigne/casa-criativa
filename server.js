const express = require("express");
const server = express();
const db = require("./db");

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true
});

server.get("/", (req, res) => {
  db.all(`SELECT * FROM ideias`, (err, rows) => {
    if (err) {
      console.log(err);
      return res.send("Erro no Banco de Dados");
    }

    const reversedIdeias = [...rows].reverse();
    let lastIdeias = [];
    for (let ideia of reversedIdeias) {
      if (lastIdeias.length < 2) {
        lastIdeias.push(ideia);
      }
    }
    return res.render("index.html", { ideias: lastIdeias });
  });
});

server.get("/ideias", (req, res) => {
  db.all(`SELECT * FROM ideias`, (err, rows) => {
    if (err) {
      console.log(err);
      return res.send("Erro no Banco de Dados");
    }
    const reversedIdeias = [...rows].reverse();
    return res.render("ideias.html", { ideias: reversedIdeias });
  });
});

server.post("/", (req, res) => {
  const query = `
    INSERT INTO ideias(
      title,
      category,
      image,
      description,
      link
    ) VALUES (?,?,?,?,?);
  `;
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ];
  db.run(query, values, err => {
    if (err) {
      console.log(err);
      return res.send("Erro no Banco de Dados");
    }
    return res.redirect("/ideias");
  });
});
server.listen(3333);
