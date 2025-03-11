// backend/models/Tournament.js
import mongoose from 'mongoose';

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  format: { type: String, enum: ['Knockout', 'Round Robin', 'League'], required: true },
  startDate: { type: Date, required: true },
  venue: { type: String, required: true },
  stages: [{ type: String }],
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
}, { timestamps: true });

export default mongoose.model('Tournament', TournamentSchema);
