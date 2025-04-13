import jwt from 'jsonwebtoken'
import {secretKey} from '../configuration/jwtConfig.js'

export function generateToken(user){
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role

    }
    return jwt.sign(payload, secretKey, {expiresIn: "1h"});
};

