'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetLinkSent, setResetLinkSent] = useState(false);
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // This would be replaced with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResetLinkSent(true);
    } catch (error) {
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (resetLinkSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="flex justify-center">
              <Image 
                src="/logo.png" 
                alt="Naree Power Solutions" 
                width={150} 
                height={50}
                className="h-12 w-auto" 
              />
            </div>
            <div className="text-green-600 mt-6 mb-4 text-5xl">✓</div>
            <h2 className="text-2xl font-bold mb-4">Reset Link Sent</h2>
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to <span className="font-medium">{email}</span>. 
              Please check your email inbox.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              If you don't see the email, please check your spam folder or request another link.
            </p>
            <div className="space-y-3">
              <Link 
                href="/signin" 
                className="block bg-orange-600 text-white py-3 px-6 rounded hover:bg-orange-700 transition-colors"
              >
                Return to Sign In
              </Link>
              <button 
                onClick={() => setResetLinkSent(false)}
                className="block w-full text-orange-600 hover:text-orange-500"
              >
                Try a different email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="Naree Power Solutions" 
                width={150} 
                height={50}
                className="h-12 w-auto" 
              />
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.form && (
              <div className="bg-red-50 text-red-700 p-3 rounded border border-red-200 mb-4">
                {errors.form}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending reset link...' : 'Send reset link'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/signin" className="text-orange-600 hover:text-orange-500">
              Return to sign in
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-orange-600 hover:text-orange-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
