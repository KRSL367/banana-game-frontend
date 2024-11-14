import React, { createContext, useContext, useState, ReactNode } from "react"; 

// Interface defining the structure of user data
export interface LoginUserData {
  username: string; 
  full_name: string;
}

// Interface defining the structure of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;  
  login: (token: string, user: LoginUserData) => void;  
  logout: () => void;  
  user: LoginUserData | null;  
}

// Creating an authentication context to provide and consume authentication data
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to manage authentication state and functions, making them accessible to child components
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to check if user is authenticated by verifying the presence of a token in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("authToken");
    return !!token;
  });

  // State to store the logged-in user's data, retrieving from localStorage if available
  const [user, setUser] = useState<LoginUserData | null>(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  // Login function to store token and user data in localStorage and update component state
  const login = (token: string, userData: LoginUserData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Logout function to remove token and user data from localStorage and reset state
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Provides authentication data and functions to child components
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication data and functions from the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
