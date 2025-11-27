const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// GET all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// POST add new student
app.post("/students", (req, res) => {
  const data = req.body;
  db.query("INSERT INTO students SET ?", data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Student added successfully");
  });
});

// PUT update student
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  db.query("UPDATE students SET ? WHERE id = ?", [data, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Student updated successfully");
  });
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM students WHERE id = ?", id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Student deleted successfully");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
