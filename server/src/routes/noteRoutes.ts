// import express from 'express';
// import { getNotes, createNote, deleteNote } from '../controllers/noteController';
// import { protect } from '../middleware/authMiddleware';

// const router = express.Router();

// // Apply the 'protect' middleware to all these routes
// router.route('/').get(protect, getNotes).post(protect, createNote);
// router.route('/:id').delete(protect, deleteNote);

// export default router;

import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Route to get all notes for a user
router.get('/', protect, getNotes);

// Route to create a new note
router.post('/', protect, createNote);

// Route to delete a single note by its ID
router.delete('/:id', protect, deleteNote);

export default router;