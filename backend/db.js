const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // MAMP default
  password: "root",   // MAMP default
  database: "school",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
    return;
  }
  console.log("Connected to MySQL (MAMP)");
});

module.exports = db;
