import bcrypt from 'bcrypt'
import {generateToken} from '../utils/jwtUtils.js'
import User from '../models/user.js';

export async function login(email, password) {
    try {
      console.log("Attempting login with email:", email);
  
      const existingUser = await User.findOne({ email });
      console.log("User found:", existingUser);
  
      if (!existingUser) {
        console.log("User not found");
        throw new Error("User not found");
      }
  
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      console.log("Password valid:", isPasswordValid);
  
      if (!isPasswordValid) {
        console.log("Invalid password");
        throw new Error("Incorrect password");
      }
  
      const token = generateToken(existingUser);
      console.log("Token generated");
      return token;
  
    } catch (error) {
        console.error("Error in login service:", error.message);
        console.error(error.stack);
        throw new Error("Invalid credentials");
    }
  }
  
    
// import bcrypt from 'bcrypt';
// import { generateToken } from '../utils/jwtUtils.js';
// import User from '../models/user.js';

// export async function login(email, password) {
//   console.log("====== LOGIN SERVICE STARTED ======");
//   console.log("Received email:", email);
//   console.log("Received password:", password);

//   try {
//     if (!email || !password) {
//       console.error("Missing email or password in request");
//       throw new Error("Email and password are required");
//     }

//     // Check DB connection
//     if (!User) {
//       console.error("User model not found or not connected");
//       throw new Error("Database not connected properly");
//     }

//     // Step 1: Find user
//     console.log("Querying database for user...");
//     const existingUser = await User.findOne({ email });
//     console.log("Database query complete");

//     if (!existingUser) {
//       console.log("❌ User not found with email:", email);
//       throw new Error("User not found");
//     }

//     console.log("✅ User found:", {
//       id: existingUser._id,
//       email: existingUser.email,
//       hashedPassword: existingUser.password,
//     });

//     // Step 2: Compare passwords
//     console.log("Comparing passwords...");
//     const isPasswordValid = await bcrypt.compare(password, existingUser.password);
//     console.log("Password comparison result:", isPasswordValid);

//     if (!isPasswordValid) {
//       console.log("❌ Password mismatch for user:", email);
//       throw new Error("Incorrect password");
//     }

//     // Step 3: Generate token
//     console.log("Generating JWT token...");
//     const token = generateToken(existingUser);
//     console.log("✅ Token generated:", token);

//     console.log("====== LOGIN SERVICE COMPLETED ======");
//     return token;

//   } catch (error) {
//     console.error("💥 Error in login service:");
//     console.error("Message:", error.message);
//     console.error("Stack:", error.stack);
//     throw new Error("Invalid credentials");
//   }
// }
