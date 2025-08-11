const User = require("../models/userModel");
const fingerprintService = require("../services/fingerprintService");
const tokenService = require("../services/tokenService");

exports.enrollUser = async (req, res) => {
  const { userId, fingerprintTemplate } = req.body;
  if (!userId || !fingerprintTemplate) {
    return res
      .status(400)
      .json({ error: "userId and fingerprintTemplate are required" });
  }

  const encryptedTemplate = fingerprintService.encryptTemplate(fingerprintTemplate);
  const fingerprintHash = fingerprintService.hashTemplate(fingerprintTemplate);

  const token = tokenService.generateDummyToken();

  try {
    const user = new User({
      userId,
      encryptedFingerprint: encryptedTemplate,
      token,
      fingerprintHash,
      onlyForTesting: fingerprintTemplate,
    });
    await user.save();
    res.json({ message: "Enrollment successful", token });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: "User already enrolled" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};
