import connectDataBase from "./Database/DataConnection.js"
import { User } from "./Models/User.model.js"
import bcrypt from "bcrypt"

const userRegister = async () => {
    connectDataBase ()
    try {
        const hashPassword = await bcrypt.hash("admin",12)
        const newUser = new User({
            password : hashPassword ,
            role : "admin"
        })
        await newUser.save()
    } catch (error) {
        console.log(error)
    }
}

userRegister() ;