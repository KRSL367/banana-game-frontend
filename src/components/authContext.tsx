import React, { createContext, useContext, useState, ReactNode } from "react"; 

// Interface to define the shape of user data when logging in
export interface LoginUserData {
  username: string; 
  full_name: string;
}

// Interface to define the types for the authentication context
interface AuthContextType {
  isAuthenticated: boolean;  // Boolean to track if the user is authenticated
  login: (token: string, user: LoginUserData) => void;  // Function to log in a user
  logout: () => void;  // Function to log out a user
  user: LoginUserData | null;  // Stores user data or null if not logged in
}

// Creating the AuthContext with an optional initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to manage authentication state and provide context to child components
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to track if the user is authenticated based on the presence of a token in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("authToken");  // Check if token exists in localStorage
    return !!token;  // Convert to boolean, true if token exists, otherwise false
  });

  // State to store the user data, parsing from localStorage if it exists
  const [user, setUser] = useState<LoginUserData | null>(() => {
    const userString = localStorage.getItem("user");  // Retrieve user data from localStorage
    return userString ? JSON.parse(userString) : null;  // Parse JSON if exists, otherwise null
  });

  // Login function to store token and user data in localStorage and update state
  const login = (token: string, userData: LoginUserData) => {
    localStorage.setItem("authToken", token);  // Store token in localStorage
    localStorage.setItem("user", JSON.stringify(userData));  // Store user data in localStorage as JSON
    setIsAuthenticated(true);  // Update authentication state
    setUser(userData);  // Update user data state
  };

  // Logout function to remove token and user data from localStorage and reset state
  const logout = () => {
    localStorage.removeItem("authToken");  // Remove token from localStorage
    localStorage.removeItem("user");  // Remove user data from localStorage
    setIsAuthenticated(false);  // Reset authentication state
    setUser(null);  // Reset user data state
  };

  return (
    // Providing the authentication state and functions to child components
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}  {/* Rendering children components wrapped by AuthProvider */}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);  // Accessing the context value
  if (!context) {
    // Throwing an error if useAuth is used outside of AuthProvider
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;  // Returning the context value if within AuthProvider
};
