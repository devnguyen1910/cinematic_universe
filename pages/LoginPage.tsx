
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-brand-gray/50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300 block mb-2">Email address</label>
            <input type="email" id="email" className="w-full px-3 py-2 text-white bg-brand-dark border border-gray-600 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red" required />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-300 block mb-2">Password</label>
            <input type="password" id="password" className="w-full px-3 py-2 text-white bg-brand-dark border border-gray-600 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red" required />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-red bg-gray-700 border-gray-600 rounded focus:ring-brand-red" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-brand-red hover:text-red-400">Forgot your password?</a>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 text-lg font-semibold text-white bg-brand-red rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red focus:ring-offset-brand-dark transition-colors duration-300">
              Sign in
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-400">
          Not a member? <Link to="/signup" className="font-medium text-brand-red hover:text-red-400">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
