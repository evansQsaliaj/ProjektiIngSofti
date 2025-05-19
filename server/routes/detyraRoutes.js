import Express from "express";
import detyreController from "../controllers/detyre.controller.js"
const Router = Express.Router()
Router.post('/',detyreController.krijoDetyre)
Router.get('/',detyreController.ktheGjithDetyrat)

export default Router