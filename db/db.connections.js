import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const initializeDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MongoDB: ${connection.connection.name}`)
    } catch (error) {
        console.log("Error connecting database", error.message)
        process.exit(1)
    }
}