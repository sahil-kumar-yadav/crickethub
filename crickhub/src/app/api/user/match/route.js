import express from 'express';
import Match from '../models/Match.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Update match scorecard & emit real-time updates
router.put('/:id/score', async (req, res) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(req.params.id, { scorecard: req.body }, { new: true });

    // Emit real-time update via Socket.io
    req.app.get('io').emit('matchUpdate', updatedMatch);

    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Sample match data
const matches = [
  {
    id: 1,
    teams: "India vs Australia",
    date: "2025-03-30",
    time: "10:00 AM",
    venue: "Mumbai",
  },
  {
    id: 2,
    teams: "England vs South Africa",
    date: "2025-04-02",
    time: "2:00 PM",
    venue: "London",
  },
];

// Get all matches
router.get("/", (req, res) => {
  res.json(matches);
});

// Export the router as default
export default router;
