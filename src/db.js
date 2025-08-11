// database connection

const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/fingerpay";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[FingerPay] Connected to MongoDB");
  } catch (error) {
    console.error("[FingerPay] MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
