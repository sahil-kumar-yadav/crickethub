import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

// Create a new team
router.post("/", async (req, res) => {
  try {
    const { name, players, userId } = req.body;

    const team = new Team({ name, players, userId });
    await team.save();

    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all teams for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const teams = await Team.find({ userId });
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a team
router.delete("/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;

    await Team.findByIdAndDelete(teamId);
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;