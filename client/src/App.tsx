import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

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

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/notes`);
        const data = (await res.json()) as Note[];
        setNotes(data);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  const createNote = async () => {
    if (!draft.title.trim() && !draft.content.trim()) {
      return;
    }
    const res = await fetch(`${API_BASE}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const created = (await res.json()) as Note;
    setNotes((prev) => [created, ...prev]);
    setDraft(emptyDraft);
  };

  const deleteNote = async (id: string) => {
    await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Notes</p>
          <h1>Personal Notes</h1>
        </div>
        <button className="primary" onClick={createNote}>
          Save note
        </button>
      </header>

      <section className="composer">
        <input
          value={draft.title}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, title: event.target.value }))
          }
          placeholder="Title"
        />
        <textarea
          value={draft.content}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, content: event.target.value }))
          }
          placeholder="Write something..."
          rows={5}
        />
      </section>

      <section className="notes">
        {loading ? (
          <p className="muted">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="muted">No notes yet. Add your first note above.</p>
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
                  <button
                    className="ghost"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </footer>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
