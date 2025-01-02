import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const GlobalContext = createContext();

axios.defaults.baseURL = "http://localhost:8000"; // the server url to send requests
axios.defaults.withCredentials = true; // to send cookies with every request

export const GlobalContextProvider = ({ children }) => {
  const router = useRouter();

  // State variables to store the user's authentication status and profile
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth0User, setAuth0User] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);

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
      console.log("User profile", res.data);
      setUserProfile(res.data);
    } catch (error) {
      console.log("Error fetching user profile", error);
    }
  };

  console.log(auth0User)

  useEffect(() => {
    getUserProfile("google-oauth2|106774463390218834295")
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        auth0User,
        userProfile,
        getUserProfile,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
