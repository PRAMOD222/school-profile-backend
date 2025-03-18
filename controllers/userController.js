const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Signup controller
exports.signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  

  try {
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
      
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    console.log("user:", user);
    

    if (user) {
      res.status(201).json({
        user: { _id: user.id, name: user.name, email: user.email },
        token: generateToken(user.id),
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        user: { _id: user.id, name: user.name, email: user.email },
        token: generateToken(user.id),
        
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users controller
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


