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

    //add comleted todoChecklist
    tasks=await Promise.all(tasks.map(async (task) => {
        const completedCount= task.todoChecklist.filter(item =>item.completed).length;
        return {...task._doc, completedTodoCount:completedCount}
    }));

    //status summary counts
    const allTasks = await Task.countDocuments(req.user.role === 'admin' ? {}: {assignedTo: req.user._id});
    const pendingTasks = await Task.countDocuments({
        ...filter, status:"Pending",
        ...(req.user.role !== 'admin' && {assignedTo:req.user._id})
    })
    const inProgressTasks = await Task.countDocuments({
        ...filter, status:"In Progress",
        ...(req.user.role !== 'admin' && {assignedTo:req.user._id})
    })
    const completedTasks = await Task.countDocuments({
        ...filter, status:"Completed",
        ...(req.user.role !== 'admin' && {assignedTo:req.user._id})
    })
    res.json({
        tasks, statusSummary:{
            all:allTasks,pendingTasks,inProgressTasks,completedTasks
        },
    })

    } catch (error) {
        res.status(500).json({message:"server error", error:error.message})
    }
}
//get Task by id
export const getTaskById =async (req,res) => {
    try {
        const task =await Task.findById(req.params.id).populate("assignedTo", "name email");
        if(!task) return res.status(404).json({message:"Task not found"});
        res.json(task)
    } catch (error) {
       res.status(500).json({message:"server error", error:error.message}) 
    }
}