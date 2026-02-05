import { Note } from "../api/notes";

type Props = {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
};

export function NoteCard({ note, onEdit, onDelete }: Props) {
  return (
    <article className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-lg mb-1">{note.title || "Untitled"}</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{note.content || "No content"}</p>
      </div>
      <footer className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>{new Date(note.updatedAt ?? note.createdAt).toLocaleString()}</span>
        <div className="flex gap-2">
          <button className="text-blue-600 hover:underline" onClick={onEdit}>
            Edit
          </button>
          <button className="text-red-600 hover:underline" onClick={onDelete}>
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
}
