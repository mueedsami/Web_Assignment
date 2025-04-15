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
  