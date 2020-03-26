const express = require("express");
const server = express();

server.use(express.static("public"));

const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true
});

const ideias = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    titulo: "Cursos de Programação",
    categoria: "Estudo",
    descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "https://google.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    titulo: "Atividade Física",
    categoria: "Saúde",
    descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "https://google.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    titulo: "Meditação",
    categoria: "Saúde",
    descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "https://google.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    titulo: "Última Ideia",
    categoria: "Estudo",
    descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "https://google.com.br"
  }
];

server.get("/", (req, res) => {
  const reversedIdeias = [...ideias].reverse();
  let lastIdeias = [];
  for (let ideia of reversedIdeias) {
    if (lastIdeias.length < 2) {
      lastIdeias.push(ideia);
    }
  }
  return res.render("index.html", { ideias: lastIdeias });
});

server.get("/ideias", (req, res) => {
  const reversedIdeias = [...ideias].reverse();
  return res.render("ideias.html", { ideias: reversedIdeias });
});

server.listen(3333);
