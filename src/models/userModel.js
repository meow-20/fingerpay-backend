// In-memory or DB user schema and storage

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String, //phone number
    required: true,
    unique: true,
  },
  encryptedFingerprint: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  fingerprintHash: {
    type: String,
    require: true,
  },
  onlyForTesting: {
    type: String,
    require: true,
  },
  walletBalance: { 
    type: Number, 
    default: 0 
  },
  bank: {
    accountNumber: String,
    bankName: String,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
