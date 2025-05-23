import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     password : {
        type : String ,
        require : true
     } ,
     role: {
      type: String,
      enum: ["admin", "counter1", "kitchen", "counter"],
      required: true,
    }
}, {timestamps : true})

export const User = mongoose.model("User", userSchema)