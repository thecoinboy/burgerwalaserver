import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    }
})
userSchema.methods.Token = function () {
    return jwt.sign({ id:this._id}, process.env.JWT_SECRET)
}

export const User = mongoose.model("User", userSchema);



