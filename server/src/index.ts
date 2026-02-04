import cors from "cors";
import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
};

type NoteInput = {
  title?: string;
  content?: string;
};

const app = express();
app.use(cors());
app.use(express.json());

let notes: Note[] = [];

// GET all notes
app.get("/notes", (_req: Request, res: Response) => {
  res.json(notes);
});

// CREATE note
app.post("/notes", (req: Request, res: Response) => {
  const { title = "", content = "" } = req.body as NoteInput;
  const newNote: Note = {
    id: uuid(),
    title,
    content,
    createdAt: new Date(),
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE note
app.delete("/notes/:id", (req: Request, res: Response) => {
  notes = notes.filter((note) => note.id !== req.params.id);
  res.status(204).send();
});

// UPDATE note
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (
    (!title || !title.trim()) &&
    (!content || !content.trim())
  ) {
    return res.status(400).json({
      message: "Title or content is required",
    });
  }

  const noteIndex = notes.findIndex((n) => n.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  const updatedNote = {
    ...notes[noteIndex],
    title: title ?? notes[noteIndex].title,
    content: content ?? notes[noteIndex].content,
    updatedAt: new Date().toISOString(),
  };

  notes[noteIndex] = updatedNote;

  res.status(200).json(updatedNote);
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
