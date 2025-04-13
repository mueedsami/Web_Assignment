import {login as authService} from "../services/login.js"

export async function login(req, res) {
    try {
        const {email, password} = req.body;
        const token = await authService(email,password);
        res.json({token:token});

    } catch (error) {
        console.error("Controller caught error:", error.message);
        res.status(401).json({message: "invalid credentials"});

    }


    
}

// module.exports ={
//     login
// }