import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Please provide a username"],
        unique: true
    },
    email:{
        type:String,
        required: [true,"Please provide a email"],
        unique : true
    },
    password:{
        type: String,
        required: [true,"Please provide a password"],
   
    },
    isVerified:{
        type:Boolean,
        default : false,
    },
    isAdmin:{
        type: Boolean,
        default : false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    
})


// export little different  
// here in nextjs it does not know wheather the connection made of the model first time or is it 
// already modeled so need to export little different modeling

const User = mongoose.models.users // use already existing else
                || mongoose.model("users",userSchema) // here using name "users" instead of "User" for consistency 
                                                        // since "User" will be stored as "users"


export default User;



