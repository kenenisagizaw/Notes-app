// Base URL for the notes API, configured via Vite env.
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

export type Draft = {
  title: string;
  content: string;
};

// Fetch all notes.
export async function getNotes(): Promise<Note[]> {
  const res = await fetch(`${API_BASE}/notes`);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

// Create a new note from a draft.
export async function createNote(draft: Draft): Promise<Note> {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

// Update an existing note by id.
export async function updateNote(
  id: string,
  draft: Draft
): Promise<Note> {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

// Delete a note by id.
export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
}

