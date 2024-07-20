import express from "express";
import {isAuthenticated} from "../middlewares/auth.js"
import {createdTask , getMyTask , getSingleTask , updateTask , deleteTask} from "../controller/taskController.js"

const  router = express.Router() ; 


router.post("/post" ,isAuthenticated   ,  createdTask);
router.put("/update/:id" ,   isAuthenticated , updateTask);
router.delete("/delete/:id" , isAuthenticated , deleteTask);
router.get("/mytask" , isAuthenticated , getMyTask);
router.get("/single/:id" , isAuthenticated , getSingleTask);


export default router ; 

