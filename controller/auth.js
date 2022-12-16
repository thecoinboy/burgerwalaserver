import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

export const isAuthenticated = async (req, res, next) =>{
    const { token } = req.cookies;
    try {
        if(token){
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id, "-password")        
            next();
        }else(
            res.status(500).json({
                success:false,
                message:"token not found"
            })
        )     
    } catch (error) {
        res.status(500).json({
            err:error,
            message:error.message
        })
        
    }
   
}

export const adminAuth = (req, res, next) => {
    const user = req.user
    if(user.role !== "admin"){
        res.status(401).json({
            message:"not authorized"
        })
    }
    next();
}


