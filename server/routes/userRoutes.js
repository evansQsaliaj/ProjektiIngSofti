import Express from "express";
import userController from "../controllers/user.controller.js"
const Router = Express.Router()
Router.post('/',userController.krijoUser)
Router.get('/',userController.ktheGjithUserat)
export default Router