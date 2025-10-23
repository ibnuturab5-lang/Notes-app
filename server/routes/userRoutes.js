import express from "express";
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router =express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/me',protect, getUserProfile)
router.put('/me',protect, updateUserProfile)
export default router