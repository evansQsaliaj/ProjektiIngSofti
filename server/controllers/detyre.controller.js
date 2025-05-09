import detyreModel from '../models/detyre.model'

const detyreController ={}

detyreController.krijoDetyre = async (req,res)=>{
    try {
        const detyre = new detyreModel (req.body)
        const detyraSaved = await detyre.save() 
        res.status(201).json(detyraSaved)       
    } catch (error) {
        res.status(500).json({error:error.message})
    }
} 
detyreController.ktheGjithDetyrat = async (req,res)=>{
    try {
        const detyrat = await detyreModel.find()
        res.status(200).json(detyrat)        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export default detyreController