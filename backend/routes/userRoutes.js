const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const User = require("../models/User");

// @desc    Get current user profile
// @route   GET /api/users/me
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
