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
    <section className="bg-white rounded-xl shadow p-4 mb-6 space-y-3">
      <input
        value={draft.title}
        onChange={(e) =>
          setDraft((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="Title"
        autoFocus
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
      />
      <textarea
        value={draft.content}
        onChange={(e) =>
          setDraft((prev) => ({ ...prev, content: e.target.value }))
        }
        placeholder="Write something..."
        rows={5}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
      />
      <div className="flex gap-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? "Saving..." : editing ? "Update note" : "Save note"}
        </button>
        {editing && (
          <button
            className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </section>
  );
}
