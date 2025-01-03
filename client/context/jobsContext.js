import React, { createContext, use, useEffect, useState } from "react";
import { useGlobalContext } from "./globalContext";
import axios from "axios";
import toast from "react-hot-toast";

const JobsContext = createContext();

// Set the base URL for the axios requests and include credentials in the requests to send cookies with every request to the server
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const JobsContextProvider = ({ children }) => {
  const { userProfile } = useGlobalContext();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userJobs, setUserJobs] = useState([]);

  // Get all jobs from the server
  const getJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log("Error getting jobs", error);
    } finally {
      setLoading(false);
    }
  };

  // Post a new job to the server and display a success toast message
  const createJob = async (jobData) => {
    try {
      const res = await axios.post("/api/v1/jobs", jobData);
      toast.success("Job created successfully");

      // Add the new job to the jobs state array
      setJobs((prevJobs) => [res.data, ...prevJobs]);

      // update userJobs state array
      if (userProfile._id) {
        setUserJobs((prevUserJobs) => [res.data, ...prevUserJobs]);
      }
    } catch (error) {
      console.log("Error creating job", error);
    }
  };

  // Get all jobs created by a specific user
  const getUserJobs = async (userId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/jobs/user/${userId}`);
      setUserJobs(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting user jobs", error);
    }
  };

  // Search for jobs by title
  const searchJobs = async (tags, location, title) => {
    setLoading(true);
    try {
      // build query string
      const query = new URLSearchParams();

      if (tags) query.append("tags", tags);
      if (location) query.append("location", location);
      if (title) query.append("title", title);

      // send the request
      const res = await axios.get(`/api/v1/jobs/search?${query.toString()}`);

      // set jobs to the response data
      setJobs(res.data);

      setLoading(false);
    } catch (error) {
      console.log("Error searching for jobs", error);
    } finally {
      setLoading(false);
    }
  };

  // get job by id
  const getJobById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/jobs/${id}`);
      return res.data;
    } catch (error) {
      console.log("Error getting job by id", error);
    } finally {
      setLoading(false);
    }
  };

  // Like a job
  const likeJob = async (jobId) => {
    try {
      const res = await axios.put(`/api/v1/jobs/like/${jobId}`);
      console.log(res.data);
      toast.success("Job liked successfully");
      getJobs();
    } catch (error) {
      console.log("Error liking job", error);
    }
  };

  // apply to a job
  const applyToJob = async (jobId) => {
    try {
      const res = await axios.put(`/api/v1/jobs/apply/${jobId}`);

      toast.success("Applied to job successfully");
      getJobs();
    } catch (error) {
      console.log("Error applying to job", error);
      toast.error(error.response.data.message);
    }
  };

  // delete a job
  const deleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`/api/v1/jobs/${jobId}`);

      // remove the job from the jobs state array
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

      searchJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

      toast.success("Job deleted successfully");
    } catch (error) {
      console.log("Error deleting job", error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    if (userProfile._id) {
      getUserJobs(userProfile._id);
    }
  }, [userProfile]);

  return (
    <JobsContext.Provider value={{
      jobs,
      loading,
      createJob,
      userJobs,
      searchJobs,
      getJobById,
      likeJob,
      applyToJob,
      deleteJob,
    }}>{children}</JobsContext.Provider>
  );
};

export const useJobsContext = () => {
  return useContext(JobsContext);
};
