import express from 'express';
import Tournament from '../models/Tournament.js';

const router = express.Router();

// CREATE Tournament
router.post('/', async (req, res) => {
  try {
    const newTournament = new Tournament(req.body);
    const savedTournament = await newTournament.save();
    res.status(201).json(savedTournament);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all Tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single Tournament by ID
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE Tournament by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTournament) return res.status(404).json({ message: 'Tournament not found' });
    res.status(200).json(updatedTournament);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE Tournament by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!deletedTournament) return res.status(404).json({ message: 'Tournament not found' });
    res.status(200).json({ message: 'Tournament deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

// created endpoints