import User from "../models/User.js";

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
