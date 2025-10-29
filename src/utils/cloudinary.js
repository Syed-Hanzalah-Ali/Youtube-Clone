import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINATY_APIKEY, 
    api_secret: process.env.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null;

        //upload file on cloudinary
        const uploadResult=await cloudinary.uploader.upload(localFilePath,{
            resource_type:auto
        })
        console.log("File is uploaded on Cloudinary ",uploadResult.url);
        return uploadResult;
        
    } 
    catch (error) {
        // remove the file from server incase of failed cloudinary operation
        fs.unlinkSync(localFilePath);
    }
}

export{uploadOnCloudinary};
    