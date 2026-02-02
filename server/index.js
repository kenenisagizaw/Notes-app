const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let notes = [];

// GET all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// CREATE note
app.post("/notes", (req, res) => {
  const newNote = {
    id: uuid(),
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date()
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE note
app.delete("/notes/:id", (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id);
  res.status(204).send();
});

// UPDATE note
app.put("/notes/:id", (req, res) => {
  notes = notes.map(note =>
    note.id === req.params.id
      ? { ...note, ...req.body }
      : note
  );
  res.json({ message: "Updated" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
