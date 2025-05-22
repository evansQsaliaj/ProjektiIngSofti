import mongoose from "mongoose";
import detyre from "./detyre.model.js";

const userSchema = new mongoose.Schema({
    "userName":{type:String,required:true},
    "password":{type:String,required:true},
    "rolet":[{type:String,required:false}],
    "detyrat":[{type:mongoose.Schema.ObjectId, ref:detyre, required:false}]
})

const userModel = mongoose.model("user", userSchema)
export default userModel 