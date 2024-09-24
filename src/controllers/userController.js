import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user already exists
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(409).json({ message: "User already registered." }); // Use return to stop further execution
    }

    // Create a new user if not already registered
    const newUser = await User.create(req.body);
    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    // Handle errors
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const getAllUser = async (req, res) => {
  try {
    // Parse the 'page' and 'limit' from query parameters, with default values
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page

    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    // Fetch the users with pagination
    const users = await User.find({}).skip(skip).limit(limit);

    // Get the total count of users
    const totalUsers = await User.countDocuments({});

    // Calculate total pages based on the total count and limit
    const totalPages = Math.ceil(totalUsers / limit);

    // Return the paginated result
    return res.status(200).json({
      data: users,
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalUsers,
      usersPerPage: limit,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id; // Fixed typo here
  if (userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  } else {
    return res.status(400).json({ message: "User ID is required" });
  }
};

export const deleteUserById = async (req, res) => {
  const userId = req.params.id; // Fixed typo here
  if (userId) {
    try {
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({ message: "User is not found" });
      }
      return res.status(200).json({ data: user, message: "User is deleted." });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  } else {
    return res.status(400).json({ message: "User ID is required" });
  }
};

export const updateUserById = async (req, res) => {
  const userId = req.params.id;

  if (userId) {
    try {
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Validate the update against the schema
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ data: user, message: "User updated successfully." });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  } else {
    return res.status(400).json({ message: "User ID is required" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select(
    "password name email role"
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Log the values for debugging
  console.log(user);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("Hashed Password:", isPasswordValid);

  if (isPasswordValid) {
    const encodingData = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "talal",
      { expiresIn: "3h" }
    );

    res.cookie("access_token", encodingData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000 * 3,
    });

    return res.status(200).json({ token: encodingData });
  }

  return res
    .status(401)
    .json({ message: "Email or password may be incorrect." });
};
