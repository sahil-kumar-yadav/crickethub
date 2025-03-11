// backend/models/Tournament.js
const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    format: { type: String, enum: ['Knockout', 'Round Robin', 'League'], required: true },
    startDate: { type: Date, required: true },
    venue: { type: String, required: true },
    stages: [{ type: String }],
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
}, { timestamps: true });

module.exports = mongoose.model('Tournament', TournamentSchema);
