const mongoose = require('mongoose');

let isConnected;

const connectDB = async () => {
  if (isConnected) return;

  const db = await mongoose.connect(process.env.MONGO_URI);
  isConnected = db.connections[0].readyState;
  console.log('MongoDB connected');
};

module.exports = connectDB;
