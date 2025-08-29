// import React, { useState, useEffect, useCallback } from 'react';
// import Header from '../components/Header';
// import CreateNote from '../components/CreateNote';
// import NoteItem from '../components/NoteItem';
// import styles from './Dashboard.module.css';
// import { getNotes, deleteNote } from '../services/api';
// import Spinner from '../components/Spinner'; 
// // Define the shape of a note
// interface Note {
//   _id: string;
//   title: string;
//   content: string;
// }

// const Dashboard: React.FC = () => {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [loading, setLoading] = useState(true);
//   const fetchNotes = useCallback(async () => {
//     try {
//       const { data } = await getNotes();
//       setNotes(data);
//     } catch (error) {
//       console.error('Failed to fetch notes', error);
//     }
//     finally {
//       setLoading(false);
//     }
//   },[]);

//   // Fetch notes when the component loads
//   useEffect(() => {
//     fetchNotes();
//   }, [fetchNotes]);

//   const handleNoteDelete = async (id: string) => {
//     try {
//       await deleteNote(id);
//       fetchNotes(); // Refetch notes after deleting one
//     } catch (error) {
//       console.error('Failed to delete note', error);
//     }
//   };

//   return (
//     <div className={styles.dashboard}>
//       <Header />
//       <main className={styles.mainContent}>
//         <CreateNote onNoteCreated={fetchNotes} />
//         <div className={styles.notesList}>
//           <h2 className={styles.notesTitle}>My Notes</h2>
//           {notes.length > 0 ? (
//             notes.map((note) => (
//               <NoteItem
//                 key={note._id}
//                 id={note._id}
//                 title={note.title}
//                 content={note.content}
//                 onDelete={handleNoteDelete}
//               />
//             ))
//           ) : (
//             <p>You have no notes yet. Create one!</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import CreateNote from '../components/CreateNote';
import NoteItem from '../components/NoteItem';
import Spinner from '../components/Spinner'; // <-- IMPORT SPINNER
import styles from './Dashboard.module.css';
import { getNotes, deleteNote } from '../services/api';

interface Note {
  _id: string;
  title: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true); // <-- Start true for initial fetch

  const fetchNotes = useCallback(async () => {
    try {
      const { data } = await getNotes();
      setNotes(data);
    } catch (error) {
      toast.error('Failed to fetch notes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleNoteDelete = async (id: string) => {
    const originalNotes = [...notes];
    // Optimistically update UI
    setNotes(notes.filter(note => note._id !== id));
    toast.success('Note deleted!');

    try {
      await deleteNote(id);
    } catch (error) {
      toast.error('Failed to delete note.');
      setNotes(originalNotes); // Revert on error
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.dashboard}>
      <Header />
      <main className={styles.mainContent}>
        <CreateNote onNoteCreated={fetchNotes} />
        <div className={styles.notesList}>
          <h2 className={styles.notesTitle}>My Notes</h2>
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteItem
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                onDelete={handleNoteDelete}
              />
            ))
          ) : (
            <p>You have no notes yet. Create one!</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;