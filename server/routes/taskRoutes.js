import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";

import { createTask, getTasks,getTaskById } from "../controllers/taskController.js";
const router =express.Router()

router.post('/',protect, admin, createTask)
router.get('/',protect, getTasks)
router.get('/:id',protect, getTaskById)


export default router