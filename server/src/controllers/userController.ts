// import { Request, Response } from 'express';
// import User from '../models/userModel';
// import generateToken from '../utils/generateToken';
// import sendEmail from '../utils/sendEmail';
// import { OAuth2Client } from 'google-auth-library';

// const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();
// const client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   'http://localhost:5173' // Your Redirect URI
// );
// export const requestOtp = async (req: Request, res: Response) => {
//   const { email, name } = req.body;
//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       if (!name) {
//         return res.status(400).json({ message: 'Name is required for sign-up' });
//       }
//       user = await User.create({ name, email });
//     }
//     const otp = generateOTP();
//     user.otp = otp;
//     user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
//     await user.save();

//     await sendEmail({
//       to: user.email,
//       subject: 'Your OTP for Notes App',
//       text: `Welcome! Your One-Time Password is: ${otp}\n\nThis OTP is valid for 10 minutes.`,
//     });

//     res.status(200).json({ message: 'OTP sent successfully. Please check your email.' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error processing OTP request' });
//   }
// };

// export const verifyOtp = async (req: Request, res: Response) => {
//   const { email, otp } = req.body;
//   try {
//     const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     // Mark user as verified
//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id.toString()),
//     });
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// };
// export const googleAuth = async (req: Request, res: Response) => {

//   const { code } = req.body;
//   console.log("Backend received request body:", req.body);
//   console.log("Extracted authorization code:", req.body.code);
//   try {
//     const { tokens } = await client.getToken({
//       code,
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET,
//       redirect_uri: 'http://localhost:5173',
//     });

//     const ticket = await client.verifyIdToken({
//         idToken: tokens.id_token!,
//         audience: process.env.GOOGLE_CLIENT_ID,
//     });
    
//     const { name, email, sub: googleId } = ticket.getPayload()!;

//     let user = await User.findOne({ email });

//     // If user doesn't exist, create a new one
//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         googleId,
//         isVerified: true, 
//       });
//     }
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id.toString()),
//     });

//   } catch (error) {
//     console.error('Google Auth Error:', error);
//     res.status(400).json({ message: 'Google authentication failed' });
//   }
// };

import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import sendEmail from '../utils/sendEmail';

// Initialize the Google Auth client with all necessary credentials
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5173' // The Redirect URI
);

// Helper function to generate a 6-digit OTP
const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * @desc    Request an OTP. Handles both new user sign-up and existing user sign-in.
 * @route   POST /api/users/request-otp
 * @access  Public
 */
export const requestOtp = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    let user = await User.findOne({ email });

    // If user does not exist, create a new unverified user (sign-up flow)
    if (!user) {
      if (!name) {
        return res.status(400).json({ message: 'Name is required for sign-up' });
      }
      user = await User.create({ name, email, isVerified: false });
    }

    // Generate, save, and send the OTP for both sign-up and sign-in
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10-minute expiry
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Your OTP for Notes App',
      text: `Welcome! Your One-Time Password is: ${otp}\n\nThis OTP is valid for 10 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent successfully. Please check your email.' });

  } catch (error) {
    console.error("OTP Request Error:", error);
    res.status(500).json({ message: 'Error processing OTP request' });
  }
};

/**
 * @desc    Verify OTP, mark user as verified, and log them in by returning a JWT.
 * @route   POST /api/users/verify-otp
 * @access  Public
 */
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * @desc    Authenticate user with Google, create account if new, and return a JWT.
 * @route   POST /api/users/google
 * @access  Public
 */
export const googleAuth = async (req: Request, res: Response) => {
  const { code } = req.body;
  try {
    // Exchange the authorization code for tokens
    const { tokens } = await client.getToken(code);

    // Verify the ID token to get user profile information
    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { name, email, sub: googleId } = ticket.getPayload()!;

    let user = await User.findOne({ email });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        isVerified: true, // Google users are considered verified by default
      });
    }

    // Return our application's own JWT for the session
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(400).json({ message: 'Google authentication failed' });
  }
};