import React, { useState } from 'react';
import { useLoginUser } from '../hooks/useLoginData';
import { Link } from 'react-router-dom';

// LoginPage component handles the user login functionality
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 

  const { loginUser, isLoading, error } = useLoginUser();

  // Handles form submission and calls the loginUser function from the hook
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser({ username, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-300 to-yellow-600">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white">Welcome to Banana Game</h1>
        <h3 className="mt-2 text-lg text-gray-100">Please login to play the game</h3>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>

        {/* Displays error message if login fails */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username input field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
              required
            />
          </div>

          {/* Password input field with toggle to show/hide password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
              required
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-600">
                Show Password
              </label>
            </div>
          </div>

          {/* Submit button to log the user in */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {/* Link to redirect user to the register page if they don't have an account */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-yellow-600 hover:text-yellow-800">
                Register
              </Link>
            </p>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
