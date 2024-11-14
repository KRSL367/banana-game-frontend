import { useState } from "react";
import { ApiResponse, usePostData } from "../hooks/usePostData";

// Defines the structure for the registration data expected from the user
export interface RegisterUser {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

// Custom hook to handle user registration functionality
export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);  // State to track loading status
  const [error, setError] = useState<string | null>(null);  // State to hold any registration errors
  const [data, setData] = useState<RegisterUser | null>(null);  // State to store registered user data

  // Function to register a new user
  const registerUser = async (user: RegisterUser): Promise<void> => {
    setIsLoading(true);  // Set loading to true while the request is in progress
    setError(null);  // Clear any previous errors

    // Make POST request to register user and store the response
    const response: ApiResponse<RegisterUser> = await usePostData<RegisterUser>("/auth/users/", user);

    // Check for error in response; if none, update the data state with the registered user info
    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);  // Set loading to false when the request completes
  };

  // Return the registration function and states for component use
  return {
    registerUser,
    data,
    isLoading,
    error,
  };
};
