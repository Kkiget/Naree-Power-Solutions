"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "David Oyelowo",
      role: "COO",
      company: "Sunstream Technologies",
      quote: "Naree Power Solutions transformed our operations with their solar installations. We've cut our energy costs by 40% while reducing our carbon footprint. Their team's expertise and professionalism made the entire process seamless.",
      avatar: "/images/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg"
    },
    {
      id: 2,
      name: "Sarah Mensah",
      role: "Facilities Manager",
      company: "Lagos General Hospital",
      quote: "The backup power system installed by Naree has been critical to our hospital operations. During outages, our essential services continue without interruption, potentially saving countless lives. Their ongoing support has been exceptional.",
      avatar: "/images/engineer-electric-woman-checking-maintenance-solar-cells.jpg"
    },
    {
      id: 3,
      name: "Michael Adebayo",
      role: "CEO",
      company: "Adebayo Manufacturing",
      quote: "Working with Naree on our microgrid project was a game-changer for our business. Their innovative approach to integrating solar, storage and generators has provided us reliable power 24/7, even in challenging conditions.",
      avatar: "/images/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handlePrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleDotClick = (index: number) => {
    if (!isTransitioning && index !== activeIndex) {
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-0">
        <Image
          src={testimonials[activeIndex].avatar}
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-lg text-white mb-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Hear from our satisfied clients about their experience with Naree Power Solutions
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            className={`transition-all duration-500 transform ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <blockquote className="text-center">
              <p className="font-display text-2xl md:text-3xl text-white mb-8 leading-relaxed">
                "{testimonials[activeIndex].quote}"
              </p>
              <footer className="mt-8">
                <div className="font-display text-xl text-orange-400 mb-2">
                  {testimonials[activeIndex].name}
                </div>
                <div className="text-gray-400 font-light">
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </div>
              </footer>
            </blockquote>
          </div>

          <div className="flex justify-center mt-12 space-x-4">
            <button
              onClick={handlePrevious}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-10 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-orange-500 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
