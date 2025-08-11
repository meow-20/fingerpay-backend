const User = require("../models/userModel");
const fingerprintService = require("../services/fingerprintService");

exports.payUser = async (req, res) => {
  const { fingerprintTemplate } = req.body;
  if (!fingerprintTemplate) {
    return res.status(400).json({ error: "fingerprintTemplate is required" });
  }

  const fingerprintHash = fingerprintService.hashTemplate(fingerprintTemplate);

  try {
    const user = await User.findOne({ fingerprintHash });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Fingerprint authentication failed" });
    }

    const decryptedFingerprint = fingerprintService.decryptTemplate(
      user.encryptedFingerprint
    );
    if (decryptedFingerprint !== fingerprintTemplate) {
      return res.status(401).json({ error: "Decrypted fingerprint mismatch" });
    }

    res.json({
      message: "✅ Payment successful",
      token: user.token,
      userId: user.userId,
    });
  } catch (err) {
    console.error("Error in payUser:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
