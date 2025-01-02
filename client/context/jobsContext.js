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

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    if (userProfile._id) {
      getUserJobs(userProfile._id);
    }
  }, [userProfile]);

  console.log("User jobs", userJobs);

  return (
    <JobsContext.Provider value={"hello"}>{children}</JobsContext.Provider>
  );
};

export const useJobsContext = () => {
  return useContext(JobsContext);
};
