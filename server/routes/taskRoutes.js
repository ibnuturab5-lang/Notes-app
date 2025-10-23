import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";

import { createTask } from "../controllers/taskController.js";
const router =express.Router()

router.post('/',protect, admin, createTask)


export default router