import User from "../models/user.js";
import bcrypt from 'bcrypt';
import validator from 'validator';

async function createUser(userData) {
    const { name, email, password } = userData;

    
    if (!validator.isEmail(email)) {
        throw new Error("Invalid email format");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "Employee"
    });

    
    const savedUser = await createdUser.save();
    return savedUser;
}


export { createUser };
