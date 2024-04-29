/* app.js */

const express = require('express');
const cors = require('cors');
const app = express();

// middleware setup
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS for all routes and origins

// import routes
const nodeRoutes = require('./routes/nodeRoutes');

// use routes
app.use('/api', nodeRoutes);

// define port from env file, if it does not exist set default
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
