"use client";

import { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setIsError(true);
      return;
    }
    
    // In a real implementation, you would send data to an API
    // For now, just simulate success
    setIsSubmitted(true);
    setIsError(false);
  };

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/beautiful-alternative-energy-plant-with-solar-panels.jpg" 
          alt="Solar panel farm" 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Naree Power</h2>
          <p className="text-lg mb-8">
            Get the latest insights about solar energy, power systems, and exclusive offers.
          </p>
          
          {isClient && !isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-grow">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className={`w-full px-4 py-3 rounded-lg ${isError ? 'border-2 border-red-500' : 'border border-transparent'}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (isError) setIsError(false);
                    }}
                  />
                  {isError && (
                    <p className="text-red-400 text-left mt-1 text-sm">
                      Please enter a valid email address
                    </p>
                  )}
                </div>
                <button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center"
                >
                  <span>Subscribe</span>
                  <FaPaperPlane className="ml-2" />
                </button>
              </div>
            </form>
          ) : isClient && isSubmitted ? (
            <div className="bg-green-600 bg-opacity-30 border border-green-500 p-4 rounded-lg">
              <p className="text-white">
                Thank you for subscribing! We&apos;ve sent a confirmation to your email.
              </p>
            </div>
          ) : (
            <div className="h-[100px] flex items-center justify-center">
              <p className="text-white opacity-50">Loading...</p>
            </div>
          )}
          
          <div className="relative h-48 w-full mb-4">
            <Image
              src="/images/solar-power-power-station.jpg"
              alt="Newsletter background"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <p className="text-sm text-gray-500">
            Let&apos;s stay connected!
          </p>
        </div>
      </div>
    </section>
  );
}
