import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Handle registration logic here
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
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
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
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-yellow-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            {/* <Link to="/login" className="font-semibold text-yellow-500 hover:underline">
              Login
            </Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
