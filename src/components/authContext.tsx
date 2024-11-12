
import React, { createContext, useContext, useState, ReactNode } from "react";
export interface LoginUserData {
  username : string,
  full_name: string
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, user: LoginUserData) => void; // Modify login function to accept user details
  logout: () => void;
  user: LoginUserData | null; // Include user details

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("authToken");
    return !!token;
  });

  const [user, setUser] = useState<LoginUserData | null>(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  const login = (token: string, userData: LoginUserData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
    {children}
  </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
