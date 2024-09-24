// Import required modules
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: [20, "User name must be within 20 characters."],
      required: true,
    },
    email: {
      type: String,
      max: [40, "User email must be within 40 characters."],
      required: true,
    },
    password: {
      type: String,
      max: [20, "User password must be within 20 characters."],
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  { timestamps: true }
);

// Password hash middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create the model
const userModel = mongoose.model("User", userSchema);

// Export the model
export default userModel;
