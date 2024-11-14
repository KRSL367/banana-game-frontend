import axios from "axios";
import apiClient from "../services/ApiClient";
import { LoginUserData } from "../components/authcontext";

// Defines the structure for the API response, including optional fields for login-related data
export interface ApiResponse<T> {
    data: T | null;
    status: number | null;
    error: string | null;
    access?: string;
    user?: LoginUserData;
}

// Function to make a POST request and handle the response or error
const usePostData = async <T>(url: string, payload: T): Promise<ApiResponse<T>> => {
    try {
        // Sends POST request using apiClient and returns data with potential login info if successful
        const response = await apiClient.post<T>(url, payload);
        return {
            data: response.data,
            status: response.status,
            error: null,
            access: (response.data as any).access,  // Access token if present
            user: (response.data as any).user,  // User data if present
        };
    } catch (error) {
        // Handles any axios error by returning error details, or a generic error if unexpected
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
