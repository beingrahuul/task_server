import { catchAsyncErrors } from "../middlewares/catchAsyncError.js"
import { errorMiddleware } from "../middlewares/error.js"
import ErrorHandler from "../middlewares/error.js"
import { Task } from "../models/taskSchema.js"


export const createdTask = catchAsyncErrors(async (req, resp, next) => {

    const { title, description } = req.body;
    if (!title || !description) {
        return next(new ErrorHandler("PLEASE ENTER THE TITLE AND DESCRIPTION ", 400))

    }

    const createdBy = req.user._id;
    const task = await Task.create({
        title,
        description,
        createdBy,
    })

    resp.status(200).json({
        status: true,
        message: "TASK IS CREATED SUCCESSFULLY ",
        task,

    })





});























export const deleteTask = catchAsyncErrors(async (req, resp, next) => {

    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
        return next(new ErrorHandler("TASK WAS NOT FOUND !!", 400))
    }

    await task.deleteOne();
    resp.status(200).json({
        success: true,
        message: "TASK HAS BEEN DELETED SUCCESSFULLY",


    })

});

















export const updateTask = catchAsyncErrors(async (req, resp, next) => {


    const { id } = req.params;
    let task = await Task.findById(id);

    if (!task) {
        return next(new ErrorHandler("TASK WAS NOT FOUND !!", 400))
    }

    task = await Task.findByIdAndUpdate(
        id,
        req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    }

    )

    resp.status(200).json({
        success: true,
        message: "TASK WAS UPDATED SUCCESSFULLY ",
        task

    })


});














export const getMyTask = catchAsyncErrors( async (req, resp, next) => {

const user = req.user._id ;

const tasks = await Task.find({createdBy : user})
resp.status(200).json({
success : true ,
tasks 
})
 });

















export const getSingleTask = catchAsyncErrors( async (req, resp, next) => {


    const { id } = req.params;
    let task = await Task.findById(id);

    if (!task) {
        return next(new ErrorHandler("TASK WAS NOT FOUND !!", 400))
    }

resp.status(200).json({
success : true , 
task

})


 });
