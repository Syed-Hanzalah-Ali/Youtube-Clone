import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/connect.DB.js";

dotenv.config({
    path:"./env"
})





connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("error: ",error);
        throw error;
    });

    app.listen(process.env.PORT || 3000,()=>{
        console.log(`app is listening at port: ${process.env.port}`);
        
    })
})

.catch((error)=>{
    console.log("MONGODB connection failed: ",error);
});








// import mongoose from "mongoose";
// import express from "express";
// import { DB_NAME } from "./constants";
// const app=express();

// (async()=>{
//     try {

//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//         app.on("error",(error)=>{
//             console.log("error: ",error);
//             throw error;
//         });

//         app.listen(`${process.env.PORT}`,()=>{
//             console.log(`app is listening on port: ${process.env.PORT}`);
//         });

        
//     } 
//     catch (error) {
//         console.log("error: ",error);
//         throw error;
            
//     }
// })()