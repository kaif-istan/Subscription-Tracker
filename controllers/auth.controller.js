import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Adjust the path as needed
import { JWT_SECRET, JWT_EXPIRATION_IN } from '../config/env.js'; // Adjust the path as needed



export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //logic to create a new user
        const {name, email, password} = req.body;

        // check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User with this email already exists');
            error.statusCode = 409; // Conflict
            throw error;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        const newUser = await User.create([{name, email, password: hashedPassword}], { session });
        // User.create with array returns array, so use newUser[0]

        const token = jwt.sign(
            { userId: newUser[0]._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION_IN}
        );

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUser[0],
                token
            }
        
        });
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return next(error);
        
    }
}


export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404; // Not Found
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Invalid password');
            error.statusCode = 401; // Unauthorized
            throw error;
        }

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION_IN }
        );

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                user,
                token
            }
        });







    } catch (error) {
        next(error);
    }
}


export const signOut = (req, res, next) => {}