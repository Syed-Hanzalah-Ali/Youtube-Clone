import { connectDB } from "./db/connect.DB.js";







connectDB();








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