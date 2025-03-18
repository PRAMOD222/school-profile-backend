const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/uploads', express.static('uploads'));

// Import routes

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/profile', require('./routes/schoolProfileRoutes'));


// Define port
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Add route to confirm server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

