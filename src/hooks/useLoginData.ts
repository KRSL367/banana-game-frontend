import { useState } from "react";  // Importing dependencies and hooks
import { useAuth } from "../components/authContext";
import { ApiResponse, usePostData } from "./usePostData";
import { useNavigate } from "react-router-dom";

// Interface to define the structure of login user data
export interface LoginUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  username: string;
  password?: string;
}

// Custom hook to manage user login functionality
export const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);  // State to indicate loading status
  const [error, setError] = useState<string | null>(null);  // State to handle login errors
  const [data, setData] = useState<LoginUser | null>(null);  // State to store user data after login
  const { login } = useAuth();  // Accessing login function from auth context
  const navigate = useNavigate();  // Hook to navigate after successful login

  // Function to handle user login
  const loginUser = async (user: LoginUser): Promise<void> => {
    setIsLoading(true);
    setError(null);

    // Call API to attempt login using usePostData hook
    const response: ApiResponse<LoginUser> = await usePostData<LoginUser>(
      "/auth/jwt/create/",  // Endpoint for login
      user
    );

    // If login is successful, save token and user data, and navigate to home
    if (response?.access && response?.user) {
      const { access, user } = response;
      login(access, user); 
      navigate("/");
    }

    // If there’s an error, update error state; otherwise, update user data
    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);  // End loading
  };

  // Return login function, user data, loading and error states
  return {
    loginUser,
    data,
    isLoading,
    error,
  };
};
