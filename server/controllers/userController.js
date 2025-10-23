//get all users
import Task from "../models/Task.js"
import User from "../models/User.js"
export const getUsers= async (req, res) => {
    try {
        const users = await User.find({role:'member'}).select('-password')
        // add task count to each
        const usersWithTaskCount = await Promise.all(users.map(async (user) => {
            const pendingTasks =await Task.countDocuments({assignedTo:user._id, status:'Pending'});
            const inProgressTasks =await Task.countDocuments({assignedTo:user._id, status:'In Progress'});
            const completedTasks =await Task.countDocuments({assignedTo:user._id, status:'Completed'});
            return {
                ...user._doc,
                pendingTasks, inProgressTasks, completedTasks
            }
        }))
        res.status(200).json(usersWithTaskCount)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'server error', error: error.message })
    }
}

export const getUserById= async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
       res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'server error', error: error.message })
    }
}
//delete user
export const deleteUser= async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
       res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'server error', error: error.message })
    }
}