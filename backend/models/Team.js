// backend/models/Team.js
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logoUrl: { type: String },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
