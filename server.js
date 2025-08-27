// server.js
const app = require('./api');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});