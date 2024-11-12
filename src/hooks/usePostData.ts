import axios from "axios";
import apiClient from "../services/ApiClient";
import { LoginUserData } from "../components/authcontext";

export interface ApiResponse<T> {
    data: T | null;
    status: number | null;
    error: string | null;
    access?: string;
    user?: LoginUserData;
  }
  
  const usePostData = async <T>(url: string, payload: T): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<T>(url, payload);
      return {
        data: response.data,
        status: response.status,
        error: null,
        access: (response.data as any).access,
        user: (response.data as any).user,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          status: error.response?.status || null,
          error: error.message,
        };
      } else {
        return {
          data: null,
          status: null,
          error: "An unexpected error occurred",
        };
      }
    }
  };
  
  export { usePostData };