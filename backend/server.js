// backend/server.js (updated with Socket.io)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cricket_tournament';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// HTTP server and Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('A user connected via Socket.io');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Backend with Socket.io is running');
});

server.listen(PORT, () => {
  console.log(`Server with Socket.io is running on port ${PORT}`);
});
