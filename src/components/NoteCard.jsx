const ROTATIONS = ['-1.2deg', '0.8deg', '-0.6deg', '1.4deg'];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function NoteCard({ note, rotation, onEdit, onDelete }) {
  return (
    <article className="note-card" style={{ '--tilt': ROTATIONS[rotation] }}>
      <div className="note-card-pin" aria-hidden="true" />
      <h3 className="note-card-title">{note.title}</h3>
      {note.content && <p className="note-card-content">{note.content}</p>}
      <div className="note-card-footer">
        <time className="note-card-date">{formatDate(note.updatedAt)}</time>
        <div className="note-card-actions">
          <button onClick={onEdit} aria-label="Modifier la fiche">
            Modifier
          </button>
          <button
            onClick={onDelete}
            aria-label="Supprimer la fiche"
            className="danger"
          >
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}
