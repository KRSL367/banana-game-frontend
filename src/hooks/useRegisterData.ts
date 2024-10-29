import { useState } from "react";
import { ApiResponse, usePostData } from "../hooks/usePostData";

export interface RegisterUser {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
  }


export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RegisterUser | null>(null);

  const registerUser = async (user: RegisterUser): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response: ApiResponse<RegisterUser> = await usePostData<RegisterUser>("/auth/users/", user);

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    registerUser,
    data,
    isLoading,
    error,
  };
};