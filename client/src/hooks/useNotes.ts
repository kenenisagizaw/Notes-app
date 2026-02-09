import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  Note,
  Draft,
} from "../api/notes";
//prepare hook

const emptyDraft: Draft = { title: "", content: "" };

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes();
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
      setNotes(data);
    } catch {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async () => {
    if (!draft.title.trim() && !draft.content.trim()) return;

    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        const updated = await updateNote(editingId, draft);
        setNotes((prev) =>
          prev.map((n) => (n.id === updated.id ? updated : n))
        );
      } else {
        const created = await createNote(draft);
        setNotes((prev) => [created, ...prev]);
      }

      setDraft(emptyDraft);
      setEditingId(null);
    } catch {
      setError("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (note: Note) => {
    setDraft({ title: note.title, content: note.content });
    setEditingId(note.id);
  };

  const cancelEditing = () => {
    setDraft(emptyDraft);
    setEditingId(null);
  };

  const removeNote = async (id: string) => {
    if (!confirm("Delete this note?")) return;

    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch {
      setError("Failed to delete note");
    }
  };

  return {
    notes,
    draft,
    setDraft,
    editingId,
    loading,
    saving,
    error,
    saveNote,
    startEditing,
    cancelEditing,
    removeNote,
  };
}
