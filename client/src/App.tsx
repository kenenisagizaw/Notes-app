import { useNotes } from "./hooks/useNotes";
import { NoteEditor } from "./components/NoteEditor";
import { NoteCard } from "./components/NoteCard";

export default function App() {
  const {
    notes,
    draft,
    setDraft,
    editingId,
    loading,
    error,
    saving,
    saveNote,
    startEditing,
    cancelEditing,
    removeNote,
  } = useNotes();

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Notes</p>
          <h1>Personal Notes</h1>
        </div>
      </header>

      <NoteEditor
        draft={draft}
        setDraft={setDraft}
        saving={saving}
        editing={!!editingId}
        onSave={saveNote}
        onCancel={cancelEditing}
      />

      {error && <p className="error">{error}</p>}

      <section className="notes">
        {loading ? (
          <p className="muted">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="muted">No notes yet.</p>
        ) : (
          <div className="grid">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => startEditing(note)}
                onDelete={() => removeNote(note.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
