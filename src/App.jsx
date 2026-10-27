import { useEffect, useState, useCallback } from 'react';
import NoteForm from './components/NoteForm.jsx';
import NoteList from './components/NoteList.jsx';
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from './services/api.js';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  const loadNotes = useCallback(async () => {
    try {
      setStatus('loading');
      const data = await fetchNotes();
      setNotes(data);
      setStatus('ready');
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  async function handleSave({ title, content }) {
    if (editingNote) {
      const updated = await updateNote(editingNote.id, { title, content });
      setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
      setEditingNote(null);
    } else {
      const created = await createNote({ title, content });
      setNotes((prev) => [created, ...prev]);
    }
  }

  async function handleDelete(id) {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingNote?.id === id) setEditingNote(null);
  }

  return (
    <div className="page">
      <header className="tab-header">
        <div className="tab">
          <span className="tab-index">№</span>
          <h1>Le classeur de notes</h1>
        </div>
        <p className="tab-sub">
          {status === 'ready'
            ? `${notes.length} fiche${notes.length === 1 ? '' : 's'} au dossier`
            : 'chargement du dossier…'}
        </p>
      </header>

      <main className="board">
        <NoteForm
          onSave={handleSave}
          editingNote={editingNote}
          onCancelEdit={() => setEditingNote(null)}
        />

        {status === 'error' && (
          <p className="error-banner">
            Impossible de joindre le serveur ({errorMsg}). Vérifie que le
            backend tourne sur le port 4000.
          </p>
        )}

        {status === 'loading' && (
          <p className="hint-text">Ouverture du classeur…</p>
        )}

        {status === 'ready' && (
          <NoteList
            notes={notes}
            onEdit={setEditingNote}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}
