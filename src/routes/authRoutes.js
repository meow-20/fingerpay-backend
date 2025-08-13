const express = require("express");
// const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const router = express.Router();

// router.post("/register", async (req, res) => {
//   try {
//     const { userId, password, encryptedFingerprint } = req.body;

//     if (!userId || !password) {
//       return res.status(400).json({ error: "userId and password are required" });
//     }

//     const existing = await User.findOne({ userId });
//     if (existing) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       userId,
//       password: hashedPassword,
//       encryptedFingerprint
//     });

//     await newUser.save();
//     res.json({ message: "User registered successfully", userId: newUser.userId });
//   } catch (err) {
//     console.error("Register Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

router.post("/login", async (req, res) => {
    try {
      const { userId, password } = req.body;
  
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (!isMatch) {
    //     return res.status(400).json({ error: "Invalid credentials" });
    //   }
  
      res.json({
        message: "Login successful",
        user: {
          userId: user.userId,
          walletBalance: user.walletBalance,
          linkedBank: user.linkedBank
        }
      });
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
module.exports = router;
