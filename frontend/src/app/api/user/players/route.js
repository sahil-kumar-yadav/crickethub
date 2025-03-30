import express from "express";

const router = express.Router();

// Sample player data
const players = [
  { id: 1, name: "Virat Kohli", runs: 12000, wickets: 4 },
  { id: 2, name: "Steve Smith", runs: 9500, wickets: 2 },
  { id: 3, name: "Jasprit Bumrah", runs: 200, wickets: 300 },
];

// Get all players
router.get("/", (req, res) => {
  res.json(players);
});

export default router;