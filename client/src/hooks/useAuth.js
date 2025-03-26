import { useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom hook for signup
  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        userData
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setLoading(false);
      throw err;
    }
  };

  // Custom hook for login
  const login = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        userData
      );
      localStorage.setItem("token", response.data.token); // Saving JWT token into local storage
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Saving user into local storage
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
      throw err;
    }
  };

  return { signup, login, loading, error };
};
