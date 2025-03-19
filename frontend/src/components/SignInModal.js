"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const SignInModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between sign-in and sign-up forms
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (isSignUp) {
      // Handle sign-up logic here (if required by your app)
      // Example for NextAuth.js sign-up: 
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          alert('Sign-up successful!');
          setIsSignUp(false); // Switch to sign-in form after successful sign-up
        } else {
          alert('Sign-up failed');
        }
      } catch (error) {
        console.error(error);
        alert('Error signing up');
      }
    } else {
      // Handle sign-in logic with NextAuth.js
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false, // Prevent auto-redirect on sign-in
      });

      if (res?.error) {
        alert('Sign-in failed! Check your credentials.');
      } else {
        alert('Sign-in successful!');
        router.push('/dashboard'); // Redirect to dashboard or homepage after successful login
      }
    }
    
    setLoading(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white p-8 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 text-white bg-blue-500 rounded-md ${loading && 'bg-gray-400'}`}
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
