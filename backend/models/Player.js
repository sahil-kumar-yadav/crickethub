// backend/models/Player.js
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'], required: true },
  battingStats: {
    matchesPlayed: { type: Number, default: 0 },
    runsScored: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 }
  },
  bowlingStats: {
    matchesPlayed: { type: Number, default: 0 },
    wicketsTaken: { type: Number, default: 0 },
    economyRate: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Player', PlayerSchema);
