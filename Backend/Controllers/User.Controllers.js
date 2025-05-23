import dotenv from "dotenv";
dotenv.config();
import { User } from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login  = async (req ,res) => {
    try {
        const {role , password} = req.body;
        const user = await User.findOne({role})
        if (!user) {
            res.status(404).json({success: false , error : "User Not Found"})
        }

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            res.status(404).json({success : false , error : "Wrong Password"})
        }

        const Token = jwt.sign({_id: user._id , role : user.role},
            process.env.SECRET_KEY, {expiresIn : "1d"}
        )

        res.status(200)
        .json({
            success : true , 
            Token , 
            user: {_id: user._id , role : user.role },
        })
    } catch (error) {
        console.log(error)
    }
}