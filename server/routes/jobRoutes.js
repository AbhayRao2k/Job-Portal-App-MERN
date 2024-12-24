import express from "express";
import { createJob, getJobs, getJobsByUser, searchJobs } from "../controllers/jobController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/jobs", protect, createJob)
router.get("/jobs", getJobs)
router.get("/jobs/user/:id", protect, getJobsByUser)

//search jobs
router.get("/jobs/search", searchJobs)

export default router;