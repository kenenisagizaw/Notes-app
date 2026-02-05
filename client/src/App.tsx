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
      <header className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">Notes</p>
          <h1 className="text-3xl font-bold">Personal Notes</h1>
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
          <p className="muted text-center mt-6">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="muted text-center mt-6">No notes yet. Add your first note above.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
