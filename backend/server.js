import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cricket_tournament';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// Pass io instance to routes via app locals
app.set('io', io);

// Socket.io Connection
io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });

  // Real-time event example
  socket.on('liveScoreUpdate', (data) => {
    io.emit('scoreUpdate', data);
  });
});

// Middleware setup
app.use(cors());
app.use(express.json());

// Import Routes
import tournamentRoutes from './routes/tournament.js';
import authRoutes from './routes/auth.js';
// Import Match Routes
import matchRoutes from './routes/match.js';
app.use('/api/matches', matchRoutes);

app.use('/api/tournaments', tournamentRoutes);
app.use('/api/auth', authRoutes);

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
