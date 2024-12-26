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
    const jobs = await Job.find({})
      .populate(
        // this will populate and get the createdBy field with the name and profilePicture of the user
        "createdBy",
        "name profilePicture"
      )
      .sort({ createdAt: -1 }); // sort by latest jobs

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getJobs", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get jobs by user
export const getJobsByUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const jobs = await Job.find({ createdBy: user._id })
      .populate("createdBy", "name profilePicture")
      .sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getJobsByUser", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// search jobs
export const searchJobs = asyncHandler(async (req, res) => {
  try {
    const { tags, location, title } = req.query;

    let query = {};

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    if (location) {
      // "i" means case-insensitive search
      query.location = { $regex: location, $options: "i" };
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const jobs = await Job.find(query)
      .populate("createdBy", "name profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in searchJobs", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// apply for job
export const applyJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // to check if job exists
    if(!job) {
      return res.status(404).json({
        message: "Job not found"
      })
    }

    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if(job.applicants.includes(user._id)) {
      return res.status(400).json({
        message: "You have already applied for this job"
      })
    }
    job.applicants.push(user._id); // add user to applicants array of the job

    await job.save(); // save the job with updated applicants array

    return res.status(200).json(job); // return the job with updated applicants array

  } catch (error) {
    console.log("Error in applyJob", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// like job and unlike job
export const likeJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // to check if job exists
    if(!job) {
      return res.status(404).json({
        message: "Job not found"
      })
    }

    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    
    // to check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isLiked = job.likes.includes(user._id);

    // if job is already liked by the user, then unlike the job
    if(isLiked) {
      job.likes = job.likes.filter((like) => !like.equals(user._id));
    } else {
      job.likes.push(user._id);
    }

    await job.save();

    return res.status(200).json(job);

  } catch (error) {
    console.log("Error in likeJob", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get job by id
export const getJobById = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;

    const job = await Job.findById(id).populate("createdBy", "name profilePicture");

    if(!job) {
      return res.status(404).json({
        message: "Job not found"
      })
    }

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in getJobById", error);
    return res.status(500).json({
      message: "Server Error",
    });
    
  }
});

// delete job
export const deleteJob = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;

    const job = await Job.findById(id);
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if(!job) {
      return res.status(404).json({
        message: "Job not found"
      })
    }

    if(!user) {
      return res.status(404).json({
        message: "User not found"
      })
    } 

    await job.deleteOne({_id: id});
    return res.status(200).json({
      message: "Job deleted successfully"
    });
  } catch (error) {
    console.log("Error in deleteJob", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});