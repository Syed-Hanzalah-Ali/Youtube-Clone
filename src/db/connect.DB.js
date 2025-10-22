import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";

export async function connectDB(){
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MONGODB connected, DB HOST: ${connectionInstance.connection.host}`);
        
        
    } 
    catch (error) {
        console.log("MONGODB connection failed: ",error);
        process.exit(1);  // terminate the process with error code 1
            
    }
}