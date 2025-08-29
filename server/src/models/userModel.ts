// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';


// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   googleId: { type: String }, 
// }, {
//   timestamps: true, 
// });


// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });


// const User = mongoose.model('User', userSchema);

// export default User;



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