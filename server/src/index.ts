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
app.put("/notes/:id", (req: Request, res: Response) => {
  const updates = req.body as Partial<Pick<Note, "title" | "content">>;
  notes = notes.map((note) =>
    note.id === req.params.id ? { ...note, ...updates } : note
  );
  res.json({ message: "Updated" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
