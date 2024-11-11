import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiClient from "../services/ApiClient";

// ApiResponse interface to define the shape of the response
export interface ApiResponse<T> {
  data: T | null;
  status: number | null;
  error: string | null;
}

// Fetch function to get data from the API
const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.get<T>(url);
    return {
      data: response.data || null,
      status: response.status,
      error: null,
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

// Custom hook to fetch data using React Query
const useFetchData = <T>(url: string) => {
  const queryKey = [url]; // Dynamically generate the query key based on the URL
  const queryFn = () => fetchData<T>(url); // Function that fetches data from the API

  return useQuery<ApiResponse<T>>({
    queryKey, // Query key for the cache and re-fetching
    queryFn,  // Function that fetches the data
  });
};

export { useFetchData };
