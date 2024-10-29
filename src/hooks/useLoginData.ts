import { useState } from "react";
import { useAuth } from "../components/authcontext";
import { ApiResponse, usePostData } from "./usePostData";
import { useNavigate } from "react-router-dom";

export interface LoginUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  username: string;
  password?: string;
}


export const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LoginUser | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();


  const loginUser = async (user: LoginUser): Promise<void> => {

    setIsLoading(true);
    setError(null);

    const response: ApiResponse<LoginUser> = await usePostData<LoginUser>(
      "/auth/jwt/create/",
      user
    );

    if (response?.access) {
      const { access} = response;
      login(access);
      navigate("/");
    }


    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    loginUser,
    data,
    isLoading,
    error,
  };
};