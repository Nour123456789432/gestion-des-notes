import { useEffect, useState } from 'react';

export default function NoteForm({ onSave, editingNote, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    try {
      await onSave({ title, content });
      setTitle('');
      setContent('');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="note-form-pin" aria-hidden="true" />
      <input
        className="note-form-title"
        type="text"
        placeholder="Titre de la fiche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={80}
      />
      <textarea
        className="note-form-content"
        placeholder="Écris ta note ici…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <div className="note-form-actions">
        {editingNote && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancelEdit}
          >
            Annuler
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving
            ? 'Enregistrement…'
            : editingNote
            ? 'Mettre à jour la fiche'
            : 'Épingler la fiche'}
        </button>
      </div>
    </form>
  );
}
