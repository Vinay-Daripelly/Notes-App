import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Import our custom request type
import Note from '../models/noteModel';

// @desc    Get all notes for a user
export const getNotes = async (req: AuthRequest, res: Response) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
};

// @desc    Create a new note
export const createNote = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  const note = new Note({
    user: req.user._id,
    title,
    content,
  });
  const createdNote = await note.save();
  res.status(201).json(createdNote);
};

// @desc    Delete a note
export const deleteNote = async (req: AuthRequest, res: Response) => {
  const note = await Note.findById(req.params.id);
  if (note && note.user.toString() === req.user._id.toString()) {
    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } else {
    res.status(404).json({ message: 'Note not found or user not authorized' });
  }
};