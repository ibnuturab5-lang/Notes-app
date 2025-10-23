//get all users

import User from "../models/User.js"

export const getUsers= async (req, res) => {
    try {
        const users = await User.find({role:'member'}).select('-password')
        if (!users) {
            return res.status(404).json({ message: 'user not found' })
        }
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'server error', error: error.message })
    }
}

import User from "../models/User.js"

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