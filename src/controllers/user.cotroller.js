import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser=asyncHandler(async (req,res)=>{
    // get data from user in req.body
    // validate the user data
    // check if user already exists or not
    // check for avatar image
    // upload avatar to cloudinary
    // create user object from user model
    // get response after register and remove password and refresh token
    // return response


    const {username,fullname,email,password}=req.body;

    if([username,fullname,email,password].some((field)=>{
        return field?.trim()===""  // if condition is true for any field, if condition run
    })){
        throw new ApiError("All fields are required",400); 
    }

    const existedUser= await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError("User already exist",409);
    }

    console.log(req.files);  // files comes in req.files, multer add this files field in req object
    console.log(req.files?.avatar);
    
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError("Avatar file is required",400);
    }
    console.log("avatar local path: ",avatarLocalPath);
    
    const avatar=await uploadOnCloudinary(avatarLocalPath);  // upload result return in avatar varaible
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);

    const user=await User.create({
        username:username.toLowerCase(),
        fullname,
        email,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || ""
    })

    const createdUser=await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError("user not register-something went wrong",500);
    }

    return res.status(201).json(   
        new ApiResponse(200,createdUser,"user registered successfully")
    )
})

export {registerUser}