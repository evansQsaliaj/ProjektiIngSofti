import userModel from '../models/user.model.js'

const userController ={}

userController.krijoUser = async (req,res)=>{
    try {
        const user = new userModel (req.body)
        const userSaved = await user.save() 
        res.status(201).json(userSaved)       
    } catch (error) {
        res.status(500).json({error:error.message})
    }
} 
userController.ktheGjithUserat = async (req,res)=>{
    try {
        const userat = await userModel.find()
        res.status(200).json(detyrat)        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export default userController