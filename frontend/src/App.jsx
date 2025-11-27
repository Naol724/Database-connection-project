import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "" });
  const [editId, setEditId] = useState(null);

  // Load students
  const getStudents = () => {
    axios.get("http://localhost:3000/students")
      .then(res => setStudents(res.data));
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Add student
  const addStudent = () => {
    axios.post("http://localhost:3000/students", form)
      .then(() => {
        resetForm();
        getStudents();
      });
  };

  // Update student
  const updateStudent = () => {
    axios.put(`http://localhost:3000/students/${editId}`, form)
      .then(() => {
        resetForm();
        getStudents();
      });
  };

  // Delete student
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:3000/students/${id}`)
      .then(() => getStudents());
  };

  // Reset form
  const resetForm = () => {
    setForm({ name: "", age: "" });
    setEditId(null);
  };

  return (
    <div className="container">
      <h1 className="title">Student Manager</h1>

      <div className="form-card">
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        {editId ? (
          <button className="btn update" onClick={updateStudent}>
            Update Student
          </button>
        ) : (
          <button className="btn add" onClick={addStudent}>
            Add Student
          </button>
        )}

        {editId && (
          <button className="btn cancel" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </div>

      <h2 className="subtitle">Student List</h2>

      <div className="list">
        {students.map((s) => (
          <div className="student-card" key={s.id}>
            <div>
              <strong>{s.name}</strong> — Age {s.age}
            </div>

            <div className="actions">
              <button
                className="btn small edit"
                onClick={() => {
                  setEditId(s.id);
                  setForm({ name: s.name, age: s.age });
                }}
              >
                Edit
              </button>

              <button
                className="btn small delete"
                onClick={() => deleteStudent(s.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
