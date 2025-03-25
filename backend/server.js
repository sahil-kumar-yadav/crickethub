import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Import Routes
import tournamentRoutes from './routes/tournament.js';
import authRoutes from './routes/auth.js';
// Import Match Routes
import matchRoutes from './routes/match.js';

import playersRoutes from "./routes/players.js";
import teamsRoutes from "./routes/teams.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cricket_tournament';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });

  socket.on('liveScoreUpdate', (data) => {
    io.emit('scoreUpdate', data);
  });
});

app.use('/api/matches', matchRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/auth', authRoutes);
// Add this line below the matches route
app.use("/api/players", playersRoutes);

// Add this line below the players route
app.use("/api/teams", teamsRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
