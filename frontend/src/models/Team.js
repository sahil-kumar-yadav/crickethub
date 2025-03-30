// backend/models/Team.js
import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
}, { timestamps: true });

export default mongoose.model('Team', TeamSchema);
