import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";


//connect to MongoDB

if(!DB_URI) {
  throw new Error("DB_URI is not defined in the environment variables.");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectToDatabase;

// This module connects to a MongoDB database using Mongoose.
// It exports a function that establishes the connection, and throws an error if the DB_URI is not defined in the environment variables.