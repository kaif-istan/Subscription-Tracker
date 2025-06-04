import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {
    // Check if the user is authenticated
    try {
        // authorize user by token
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        res.status(401).json({message: 'Unauthorized access', error: error.message});
    }
}

export default authorize;
// This middleware function checks if the user is authenticated by verifying the JWT token.