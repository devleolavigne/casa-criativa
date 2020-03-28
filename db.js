const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./moya.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS ideias(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `);

  //   db.run(`DELETE FROM ideias WHERE id = ?`, [1], err => {
  //     if (err) return console.log(err);

  //     console.log("DELETEI");
  //   });
});

module.exports = db;
