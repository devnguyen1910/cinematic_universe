

import React from 'react';
// FIX: Corrected import for react-router-dom components.
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-brand-gray/50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Create an Account</h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email-signup" className="text-sm font-medium text-gray-300 block mb-2">Email address</label>
            <input type="email" id="email-signup" className="w-full px-3 py-2 text-white bg-brand-dark border border-gray-600 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red" required />
          </div>
          <div>
            <label htmlFor="password-signup" className="text-sm font-medium text-gray-300 block mb-2">Password</label>
            <input type="password" id="password-signup" className="w-full px-3 py-2 text-white bg-brand-dark border border-gray-600 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red" required />
          </div>
           <div>
            <label htmlFor="confirm-password-signup" className="text-sm font-medium text-gray-300 block mb-2">Confirm Password</label>
            <input type="password" id="confirm-password-signup" className="w-full px-3 py-2 text-white bg-brand-dark border border-gray-600 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red" required />
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 text-lg font-semibold text-white bg-brand-red rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red focus:ring-offset-brand-dark transition-colors duration-300">
              Sign Up
            </button>
          </div>
        </form>
         <p className="text-sm text-center text-gray-400">
          Already have an account? <Link to="/login" className="font-medium text-brand-red hover:text-red-400">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
