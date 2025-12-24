const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase, seedDatabase } = require('./database');
const pagesRouter = require('./routes/pages');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// API Routes
app.use('/api', pagesRouter);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Memory Notebook API is running' });
});

// Initialize database
initializeDatabase();
setTimeout(() => {
    seedDatabase();
}, 500);

// Start server
app.listen(PORT, () => {
    console.log(`✨ Memory Notebook server running on http://localhost:${PORT}`);
});
