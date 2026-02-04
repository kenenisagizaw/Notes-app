import { Note } from "../api/notes";

type Props = {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
};

export function NoteCard({ note, onEdit, onDelete }: Props) {
  return (
    <article className="note">
      <div>
        <h2>{note.title || "Untitled"}</h2>
        <p>{note.content || "No content"}</p>
      </div>

      <footer>
        <span>
          {new Date(
            note.updatedAt ?? note.createdAt
          ).toLocaleString()}
        </span>

        <div>
          <button className="ghost" onClick={onEdit}>
            Edit
          </button>
          <button className="ghost" onClick={onDelete}>
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
}
