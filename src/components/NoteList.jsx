import NoteCard from './NoteCard.jsx';

export default function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>Le classeur est vide.</p>
        <p className="empty-state-sub">
          Écris ta première fiche ci-dessus pour commencer.
        </p>
      </div>
    );
  }

  return (
    <div className="note-grid">
      {notes.map((note, i) => (
        <NoteCard
          key={note.id}
          note={note}
          rotation={i % 4}
          onEdit={() => onEdit(note)}
          onDelete={() => onDelete(note.id)}
        />
      ))}
    </div>
  );
}
