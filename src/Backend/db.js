const mongoose = require("mongoose");

async function connection() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/spotify");
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error);
  }
}

module.exports = connection;

