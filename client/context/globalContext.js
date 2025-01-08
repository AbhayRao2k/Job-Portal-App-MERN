import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

axios.defaults.baseURL = "http://localhost:8000"; // the server url to send requests
axios.defaults.withCredentials = true; // to send cookies with every request

export const GlobalContextProvider = ({ children }) => {

  // State variables to store the user's authentication status and profile
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth0User, setAuth0User] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);

  // input state
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [activeEmploymentTypes, setActiveEmploymentTypes] = useState([]);
  const [salaryType, setSalaryType] = useState("Year");
  const [negotiable, setNegotiable] = useState(false);
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState({
    country: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/check-auth");
        setIsAuthenticated(res.data.isAuthenticated);
        setAuth0User(res.data.user);
        setLoading(false);
      } catch (error) {
        console.log("Error checking authentication", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const getUserProfile = async (id) => {
    try {
      const res = await axios.get(`/api/v1/user/${id}`);
      setUserProfile(res.data);
    } catch (error) {
      console.log("Error fetching user profile", error);
    }
  };

  // handle input change
  const handleInputChange = (e) => {
    setJobTitle(e.target.value.trimStart());
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value.trimStart());
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  useEffect(() => {
    if (isAuthenticated && auth0User) {
      getUserProfile(auth0User.sub);
    }
  }, [isAuthenticated, auth0User]);
 
  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        auth0User,
        userProfile,
        getUserProfile,
        loading,
        jobTitle,
        jobDescription,
        salary,
        activeEmploymentTypes,
        salaryType,
        negotiable,
        tags,
        skills,
        location,
        handleInputChange,
        handleDescriptionChange,
        handleSalaryChange,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
