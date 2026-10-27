// api.js — toutes les requêtes vers le backend passent par ici

const BASE_URL = 'http://localhost:4000/api';

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Erreur ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchNotes() {
  const res = await fetch(`${BASE_URL}/notes`);
  return handleResponse(res);
}

export async function createNote({ title, content }) {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  return handleResponse(res);
}

export async function updateNote(id, { title, content }) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  return handleResponse(res);
}

export async function deleteNote(id) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
