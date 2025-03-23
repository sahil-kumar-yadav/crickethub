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

// Export the router as default
export default router;
