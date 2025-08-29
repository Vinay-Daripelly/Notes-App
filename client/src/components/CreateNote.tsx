import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createNote } from '../services/api';
import styles from './CreateNote.module.css';

interface CreateNoteProps {
  onNoteCreated: () => void; 
}

const CreateNote: React.FC<CreateNoteProps> = ({ onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return toast.error('Title and content are required.');
    }

    setIsLoading(true);
    try {
      await createNote({ title, content });
      toast.success('Note created successfully!');
      setTitle('');
      setContent('');
      onNoteCreated(); 
    } catch (error) {
      toast.error('Failed to create note.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />
      <textarea
        placeholder="Take a note..."
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};

export default CreateNote;