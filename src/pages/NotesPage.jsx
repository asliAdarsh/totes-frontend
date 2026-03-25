import React, { useState, useEffect } from 'react';
import { Plus, StickyNote, Trash2 } from 'lucide-react';
import { getNotes, createNote, deleteNote } from '../api';

function NotesPage() {
  const [notesList, setNotesList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotesList(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      await createNote({ title, content });
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="page-content">
      <section className="glass-panel" style={{ marginBottom: '2rem' }}>
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="note-title">Note Title</label>
            <input 
              id="note-title"
              type="text" 
              placeholder="What's this note about?" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="note-content">Content</label>
            <textarea 
              id="note-content"
              placeholder="Write your thoughts..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ minHeight: '120px' }}
            />
          </div>
          <button type="submit" className="btn success" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
            <Plus size={20} /> Add Note
          </button>
        </form>
      </section>

      <div className="notes-grid">
        {notesList.length === 0 ? (
          <div className="glass-panel empty-state" style={{ gridColumn: '1 / -1' }}>
            <StickyNote size={48} />
            <h3>No notes yet</h3>
            <p>Jot down something important above!</p>
          </div>
        ) : (
          notesList.map(note => (
            <div key={note.id} className="glass-panel note-card">
              <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
                <button 
                  className="btn icon-only danger" 
                  onClick={() => handleDelete(note.id)}
                  title="Delete Note"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="note-content">
                {note.content}
              </div>
              <div className="note-footer">
                {new Date(note.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesPage;
