// controllers/bankController.js
const User = require("../models/userModel");

exports.linkBank = async (req, res) => {
  try {
    const { userId, bankName, accountNumber, sortCode } = req.body;

    if (!userId || !bankName || !accountNumber || !sortCode) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate account number (8 digits)
    if (!/^\d{8}$/.test(accountNumber)) {
      return res.status(400).json({ error: "Account number must be 8 digits" });
    }

    // Validate sort code (XX-XX-XX)
    if (!/^\d{2}-\d{2}-\d{2}$/.test(sortCode)) {
      return res
        .status(400)
        .json({ error: "Sort code must be in format XX-XX-XX" });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.bank = {
      accountNumber,
      sortCode,
      bankName,
      balance: 500,
    };

    await user.save();

    res.json({
      message: "Bank linked successfully",
      bank: user.bank,
    });
  } catch (err) {
    console.error("Bank linking error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
