import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
    },

    description: {
        type: String,
    },

    status: {
        type: String,
        enum: ["completed", "incomplete"],
        default : "incomplete"
    },

    archived: {
        type: Boolean,
        default: false
    },

    createdBy: {
        type: mongoose.ObjectId,
        required: true,

    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

})

export const Task = mongoose.model("Task" , taskSchema);