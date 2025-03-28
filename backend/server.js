// Import required libraries and modules
import express from 'express';               // Import the Express framework
import mongoose from 'mongoose';             // Import Mongoose to interact with MongoDB
import cors from 'cors';                     // Import CORS middleware to handle cross-origin requests
import http from 'http';                     // Import HTTP module to create the server
import { Server } from 'socket.io';          // Import Socket.IO to handle real-time communication
import dotenv from 'dotenv';                 // Import dotenv to handle environment variables

// Import route files that handle different API endpoints
import tournamentRoutes from './routes/tournament.js';
import authRoutes from './routes/auth.js';
import matchRoutes from './routes/match.js';
import playersRoutes from './routes/players.js';
import teamsRoutes from './routes/teams.js';

// Load environment variables from a .env file
dotenv.config();

// Create an Express app instance
const app = express();

// Set the port for the server (from environment variable or default to 5000)
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());                            // Enable Cross-Origin Resource Sharing (CORS) for the app
app.use(express.json());                    // Middleware to parse incoming requests with JSON payloads

// Set up MongoDB connection string (from environment variable or default to local MongoDB)
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cricket_tournament';

// Connect to MongoDB with Mongoose
mongoose.connect(mongoURI, {
  useNewUrlParser: true,                    // Use the new URL parser for MongoDB connection
  useUnifiedTopology: true,                // Use the unified topology to avoid deprecated warnings
  useFindAndModify: false,                 // Disable the use of the deprecated findAndModify method
  useCreateIndex: true,                    // Use createIndex for indexing in MongoDB
})
  .then(() => console.log('MongoDB connected'))  // Log success if MongoDB connection is established
  .catch(err => console.error('Error connecting to MongoDB:', err)); // Log error if connection fails

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set up a Socket.IO server to handle real-time WebSocket connections
const io = new Server(server, {
  cors: { origin: '*' },                  // Allow cross-origin connections (from any origin)
});

// Set the Socket.IO instance to be accessible via `app.set` (used later for handling events)
app.set('io', io);

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);  // Log when a user connects via WebSocket

  // Listen for the 'disconnect' event (when a user disconnects)
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);  // Log when a user disconnects
  });

  // Listen for 'liveScoreUpdate' event (when live score data is updated)
  socket.on('liveScoreUpdate', (data) => {
    io.emit('scoreUpdate', data);  // Broadcast the 'scoreUpdate' event with the new data to all connected clients
  });
});

// Set up routes for handling different API endpoints
app.use('/api/matches', matchRoutes);      // Handle requests to '/api/matches' using matchRoutes
app.use('/api/tournaments', tournamentRoutes);  // Handle requests to '/api/tournaments' using tournamentRoutes
app.use('/api/auth', authRoutes);          // Handle requests to '/api/auth' using authRoutes
app.use("/api/players", playersRoutes);    // Handle requests to '/api/players' using playersRoutes
app.use("/api/teams", teamsRoutes);        // Handle requests to '/api/teams' using teamsRoutes

// Start the server and listen for requests
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  // Log message to indicate the server is running
});
