import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Job from "../models/jobModel.js";

export const createJob = asyncHandler(async (req, res) => {
  try {
    // to get logged in user
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const {
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        message: "Description is required",
      });
    }
    if (!location) {
      return res.status(400).json({
        message: "Location is required",
      });
    }
    if (!salary) {
      return res.status(400).json({
        message: "Salary is required",
      });
    }
    if (!jobType) {
      return res.status(400).json({
        message: "Job Type is required",
      });
    }
    if (!tags) {
      return res.status(400).json({
        message: "Tags are required",
      });
    }
    if (!skills) {
      return res.status(400).json({
        message: "Skills are required",
      });
    }

    const job = new Job({
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
      createdBy: user._id,
    });

    await job.save();

    return res.status(201).json(job);
  } catch (error) {
    console.log("Error in createJob", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get jobs

export const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({});

    console.log("Jobs", jobs);
  } catch (error) {
    console.log("Error in getJobs", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});
