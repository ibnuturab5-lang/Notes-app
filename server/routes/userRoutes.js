import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { getUserById, getUsers } from "../controllers/userController.js";
const router =express.Router()

router.get('/',protect, admin, getUsers)
router.get('/single/:id', getUserById)
router.get('/single/:id', getUserById)

export default router