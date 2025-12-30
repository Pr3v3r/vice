import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Create user (password hashing happens automatically)
    const user = await User.create({
      username,
      email,
      password,
    });

    // 4. Send response (never send password)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
 } catch (error) {
        console.error(error); // 👈 THIS LINE IS CRITICAL
        res.status(500).json({ message: error.message });
      }
      
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check inputs
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4. Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Send response (NO password)
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};