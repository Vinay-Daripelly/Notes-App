import React from 'react';
import styles from './NoteItem.module.css';

interface NoteItemProps {
  id: string;
  title: string;
  content: string;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ id, title, content, onDelete }) => {
  return (
    <div className={styles.note}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p>{content}</p>
      </div>
      <button onClick={() => onDelete(id)} className={styles.deleteButton}>Delete</button>
    </div>
  );
};

export default NoteItem;