import { useEffect, useState } from "react";

/* =======================
   Config
======================= */
const API_BASE = import.meta.env.VITE_API_BASE_URL;


/* =======================
   Types
======================= */
type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type Draft = {
  title: string;
  content: string;
};

const emptyDraft: Draft = { title: "", content: "" };

/* =======================
   API helpers
======================= */
async function getNotes(): Promise<Note[]> {
  const res = await fetch(`${API_BASE}/notes`);
  if (!res.ok) throw new Error("Failed to load notes");
  return res.json();
}

async function createNoteApi(draft: Draft): Promise<Note> {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

async function deleteNoteApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
}

/* =======================
   Component
======================= */
export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);


  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =======================
     Load notes
  ======================= */
  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getNotes();
        // newest first
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        setNotes(data);
      } catch (err) {
        setError("Could not load notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  /* =======================
     Create note
  ======================= */
  const createNote = async () => {
    if (!draft.title.trim() && !draft.content.trim()) return;

    setSaving(true);
    setError(null);
    try {
      const created = await createNoteApi(draft);
      setNotes((prev) => [created, ...prev]);
      setDraft(emptyDraft);
    } catch {
      setError("Could not save note.");
    } finally {
      setSaving(false);
    }
  };
  const updateNote = async () => {
  if (!editingId) return;
  if (!draft.title.trim() && !draft.content.trim()) return;

  try {
    const res = await fetch(`${API_BASE}/notes/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });

    if (!res.ok) throw new Error("Update failed");

    const updated = (await res.json()) as Note;

    setNotes((prev) =>
      prev.map((note) => (note.id === updated.id ? updated : note))
    );

    setDraft(emptyDraft);
    setEditingId(null);
  } catch {
    alert("Could not update note");
  }
};


  /* =======================
     Delete note
  ======================= */
  const deleteNote = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    try {
      await deleteNoteApi(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch {
      setError("Could not delete note.");
    }
  };

  /* =======================
     Render
  ======================= */
  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Notes</p>
          <h1>Personal Notes</h1>
        </div>

        <button
  className="primary"
  onClick={editingId ? updateNote : createNote}
>
  {editingId ? "Update note" : "Save note"}
</button>

      </header>

      <section className="composer">
        <input
          value={draft.title}
          onChange={(e) =>
            setDraft((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Title"
          autoFocus
        />

        <textarea
          value={draft.content}
          onChange={(e) =>
            setDraft((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Write something..."
          rows={5}
        />
      </section>

      {error && <p className="error">{error}</p>}

      <section className="notes">
        {loading ? (
          <p className="muted">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="muted">
            No notes yet. Add your first note above.
          </p>
        ) : (
          <div className="grid">
            {notes.map((note) => (
              <article className="note" key={note.id}>
                <div>
                  <h2>{note.title || "Untitled"}</h2>
                  <p>{note.content || "No content"}</p>
                </div>

                <footer>
  <span>{new Date(note.createdAt).toLocaleString()}</span>

  <div>
    <button
      className="ghost"
      onClick={() => {
        setDraft({
          title: note.title,
          content: note.content,
        });
        setEditingId(note.id);
      }}
    >
      Edit
    </button>

    <button
      className="ghost"
      onClick={() => deleteNote(note.id)}
    >
      Delete
    </button>
  </div>
</footer>

              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
