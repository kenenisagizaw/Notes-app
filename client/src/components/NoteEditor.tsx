import { Draft } from "../api/notes";

type Props = {
  draft: Draft;
  setDraft: React.Dispatch<React.SetStateAction<Draft>>;
  saving: boolean;
  editing: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export function NoteEditor({
  draft,
  setDraft,
  saving,
  editing,
  onSave,
  onCancel,
}: Props) {
  return (
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

      <div>
        <button className="primary" onClick={onSave} disabled={saving}>
          {saving
            ? "Saving..."
            : editing
            ? "Update note"
            : "Save note"}
        </button>

        {editing && (
          <button className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </section>
  );
}
