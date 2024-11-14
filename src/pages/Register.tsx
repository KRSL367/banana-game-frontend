import React, { useState } from 'react';
import { useRegisterUser } from '../hooks/useRegisterData';
import { Link, Navigate } from 'react-router-dom';

// RegisterPage component handles user registration
const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  });

  const { registerUser, isLoading, error, data } = useRegisterUser(); // Custom hook for registration

  // Handles form data changes for each input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles form submission and calls the registerUser function from the hook
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(formData); // Calls the hook with form data
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-300 to-yellow-600 overflow-hidden">
      <div className="mt-10 mb-5 text-center">
        <h1 className="text-4xl font-extrabold text-white">Welcome to Banana Game</h1>
        <h3 className="mt-2 text-lg text-gray-100">Please register your account</h3>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-900">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name and Last Name input fields */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder='Enter your first name'
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder='Enter your last name'
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
                required
              />
            </div>
          </div>

          {/* Username and Email input fields */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder='Enter your username'
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
                required
              />
            </div>
          </div>

          {/* Password input field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
              required
            />
          </div>

          {/* Submit button to register the user */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          {/* Login link below the register button */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-600 hover:text-yellow-800">
                Login
              </Link>
            </p>
          </div>

          {/* Display error or success messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {data && <p className="text-green-500 text-center">Registration successful!</p>}

          {/* Redirect to login page upon successful registration */}
          {data && <Navigate to="/login" replace />}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
