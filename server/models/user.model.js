import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    "userName":{type:String,required:true},
    "password":{type:String,required:true},
    "rolet":[{type:rol,required:false}],
    "detyrat":[{type:detyre,required:false}],
})

const userModel = mongoose.model("user", userSchema)
export default userModel 