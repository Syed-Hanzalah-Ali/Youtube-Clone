import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({extended:true,limit:"20kb"}));
app.use(express.static("public"));
app.use(cookieParser())


// routes import
import userRouter from "./routes/user.routes.js";

// routes declaration  -- we have seperated the route so we have to add middleware to use route
app.use("/api/v1/users",userRouter);  // whatever the value in "" is used as prefix and will redirect to userRouter
// http://localhost:3000/api/v1/users


export {app};