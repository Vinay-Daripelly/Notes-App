
import mongoose from 'mongoose';

// Define the structure of the User document
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false }, 
  googleId: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
}, {
  timestamps: true,
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

export default User;