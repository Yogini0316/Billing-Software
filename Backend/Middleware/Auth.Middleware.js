import jwt from "jsonwebtoken"
import { User } from "../Models/User.model.js";


export const verifyUser = async (req ,res , next) => {
    try {
        const token = req.header.authorization.split(' ')[1];
        if(!token){
            return res.status(404).json({success : false , error : "Token not found"})
        }

        const decoded = jwt.verify(token , process.env.SECRET_KEY)

        if (!decoded){
            return res.status(404).json({success : false , error : "Token Not Valid"})
        }

        const user = await User.findById({_id: decoded._id}).select('-password')
        if (!user){
            return res.status(404).json({success : false , error : "User Not Found "})
        }

        req.user = user

        next()
    } catch (error) {
        return res.status(505).json({success : false , error : "Server Error "})
    }
}