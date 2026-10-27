// server.js — API backend pour l'application de notes

import 'dotenv/config';
import pool from './bd.js';

import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());


// =====================================================
// 1. TEST DE LA CONNEXION MYSQL
// =====================================================

app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS result');

    res.json({
      message: 'Connexion MYSQL réussie',
      result: rows[0].result,
    });

  } catch (error) {

    console.error('Erreur MYSQL :', error);

    res.status(500).json({
      message: 'Connexion MYSQL échouée',
      error: error.message,
    });
  }
});


// =====================================================
// 2. GET /api/notes
// Récupérer toutes les notes
// =====================================================

app.get('/api/notes', async (req, res) => {

  try {

    const [rows] = await pool.query(
      'SELECT * FROM notes ORDER BY updated_at DESC'
    );

    res.json(rows);

  } catch (error) {

    console.error('Erreur récupération notes :', error);

    res.status(500).json({
      error: 'Erreur lors de la récupération des notes',
    });
  }
});


// =====================================================
// 3. GET /api/notes/:id
// Récupérer UNE note
// =====================================================

app.get('/api/notes/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const [rows] = await pool.query(
      'SELECT * FROM notes WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {

      return res.status(404).json({
        error: 'Note introuvable',
      });
    }

    res.json(rows[0]);

  } catch (error) {

    console.error('Erreur récupération note :', error);

    res.status(500).json({
      error: 'Erreur lors de la récupération de la note',
    });
  }
});


// =====================================================
// 4. POST /api/notes
// Créer une nouvelle note
// =====================================================

app.post('/api/notes', async (req, res) => {

  try {

    const { title, content } = req.body;

    // Vérification du titre
    if (!title || !title.trim()) {

      return res.status(400).json({
        error: 'Le titre est obligatoire',
      });
    }

    const cleanTitle = title.trim();
    const cleanContent = content?.trim() || '';

    // Génération d'un UUID
    const { randomUUID } = await import('crypto');

    const id = randomUUID();

    // Insertion dans MySQL
    await pool.query(
      `
      INSERT INTO notes
      (id, title, content, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
      `,
      [id, cleanTitle, cleanContent]
    );

    // Récupérer la note créée
    const [rows] = await pool.query(
      'SELECT * FROM notes WHERE id = ?',
      [id]
    );

    res.status(201).json(rows[0]);

  } catch (error) {

    console.error('Erreur création note :', error);

    res.status(500).json({
      error: 'Erreur lors de la création de la note',
    });
  }
});


// =====================================================
// 5. PUT /api/notes/:id
// Modifier une note
// =====================================================

app.put('/api/notes/:id', async (req, res) => {

  try {

    const { id } = req.params;
    const { title, content } = req.body;

    // Vérifier que la note existe
    const [existing] = await pool.query(
      'SELECT * FROM notes WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {

      return res.status(404).json({
        error: 'Note introuvable',
      });
    }

    // Si title et content sont envoyés
    if (title !== undefined && content !== undefined) {

      await pool.query(
        `
        UPDATE notes
        SET title = ?, content = ?, updated_at = NOW()
        WHERE id = ?
        `,
        [title.trim(), content.trim(), id]
      );

    }

    // Si seulement title est envoyé
    else if (title !== undefined) {

      await pool.query(
        `
        UPDATE notes
        SET title = ?, updated_at = NOW()
        WHERE id = ?
        `,
        [title.trim(), id]
      );

    }

    // Si seulement content est envoyé
    else if (content !== undefined) {

      await pool.query(
        `
        UPDATE notes
        SET content = ?, updated_at = NOW()
        WHERE id = ?
        `,
        [content.trim(), id]
      );
    }

    // Récupérer la note après modification
    const [rows] = await pool.query(
      'SELECT * FROM notes WHERE id = ?',
      [id]
    );

    res.json(rows[0]);

  } catch (error) {

    console.error('Erreur modification note :', error);

    res.status(500).json({
      error: 'Erreur lors de la modification de la note',
    });
  }
});


// =====================================================
// 6. DELETE /api/notes/:id
// Supprimer une note
// =====================================================

app.delete('/api/notes/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM notes WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: 'Note introuvable',
      });
    }

    res.status(204).send();

  } catch (error) {

    console.error('Erreur suppression note :', error);

    res.status(500).json({
      error: 'Erreur lors de la suppression de la note',
    });
  }
});


// =====================================================
// 7. HEALTH CHECK
// =====================================================

app.get('/api/health', (req, res) => {

  res.json({
    status: 'ok',
  });

});


// =====================================================
// 8. DÉMARRAGE DU SERVEUR
// =====================================================

app.listen(PORT, () => {

  console.log(
    `✅ Serveur backend démarré sur http://localhost:${PORT}`
  );

});