import { createUser as createUserService } from '../services/signup.js';

async function createUserController(req, res) {
    try {
        const userData = req.body;
        const user = await createUserService(userData); // Call the imported function
        res.status(201).json({ user: user, message: "User created successfully" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

export { createUserController };
