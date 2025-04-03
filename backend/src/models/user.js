import mongoose from "mongoose";
import db from "../configuration/dbConfig.js"; 

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["Admin", "Employee"], default: "Employee" }
});


const User = mongoose.model("User", userSchema);
export default User;
