import Task from "../models/Task.js";

export const createTask= async (req,res) => {
    try {
        const {title,description,priority,dueDate, assignedTo,attachments,todoChecklist}=req.body;
        if(!Array.isArray(assignedTo)){
            return res.status(400).json({message:"assignedTo must be an array of user IDs"})
        }

        const task = await Task.create({title,description,priority,dueDate,assignedTo, createdBy: req.user._id, todoChecklist, attachments})
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({message:"server error", error:error.message})
    }
}

//get tasks
export const getTasks=async (req,res) => {
    try {
        const {status}=req.query;
        let filter={};
        if(status){
            filter.status=status
        }
    let tasks;
    if (req.user.role=== 'admin') {
        tasks= await Task.find(filter).populate('assignedTo', 'name email ')
    } else {
        tasks =await Task.find({...filter, assignedTo:req.user._id}).populate('assignedTo', 'name email')
    }

    } catch (error) {
        res.status(500).json({message:"server error", error:error.message})
    }
}