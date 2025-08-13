const User = require("../models/userModel");

exports.topUpWallet = async (req, res) => {
  try {
    const { userId, balance } = req.body;
    console.log(userId);
    console.log(balance);

    if (!userId || !balance || isNaN(balance)) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.walletBalance = (user.walletBalance || 0) + Number(balance);
    await user.save();

    res.json({
      message: "Wallet topped up successfully",
      walletBalance: user.walletBalance,
    });
  } catch (err) {
    console.error("Error in topUpWallet:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getWalletBalance = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(400).json({ error: "userId required in headers" });

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.walletBalance === undefined) user.walletBalance = 0;

    res.json({ walletBalance: user.walletBalance });
  } catch (err) {
    console.error("Error fetching wallet balance:", err);
    res.status(500).json({ error: "Server error" });
  }
};
