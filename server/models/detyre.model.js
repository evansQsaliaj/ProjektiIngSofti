import mongoose from "mongoose";

const detyraSchema = new mongoose.Schema({
    "titulli":{type:String,required:true},
    "shpjegimi":{type:String,required:true},
})

const detyreModel = mongoose.model("detyre", detyraSchema)
export default detyreModel 