import express from "express";
import { createJob, getJobs } from "../controllers/jobController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/jobs", protect, createJob)
router.get("/jobs", getJobs)

export default router;