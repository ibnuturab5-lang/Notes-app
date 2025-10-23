import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import cloudinary from '../config/cloudinary.js'



const generateToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
    return token
}

export const registerUser = async (req, res) => {
    const { name, email, password, adminInviteToken } = req.body;

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user already found" })
        }
        let role='member';
        if(adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN){
            role='admin';
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword,role })
        generateToken(res, user._id)
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic:user.profilePic,
            role:user.role,
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'server error', error: error.message })
    }
}
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            generateToken(res, user._id)
            return res.status(201).json({
                 _id: user._id,
            name: user.name,
            email: user.email,
            profilePic:user.profilePic,
            role:user.role,
            })
        } else {
            return res.status(400).json({ message: 'Invalid email or password' })
        }


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'server error', error: error.message })
    }
}

export const logoutUser = async (req,res) => {
    res.clearCookie('jwt',{
        httpOnly:true,
        sameSite:'strict',
        expires: new Date(0)
    }).json({message:"user logout"})
}
//get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'server error', error: error.message })
    }
}
//update user profile
export const updateUserProfile = async (req, res) => {
    const { name, email, password, profilePic } = req.body
    try {
        const user = await User.findById(req.user._id).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        user.name = name || user.name
        user.email = email || user.email
        if (password) {
            user.password = await bcrypt.hash(password, 10)
        }
        
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
                    })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'server error', error: error.message })
    }
}


