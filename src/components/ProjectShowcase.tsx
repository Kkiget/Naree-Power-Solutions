"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Define project type
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  client: string;
  location: string;
  completionDate: string;
  image: string; // Path to project image
  metrics: {
    energySavings: string;
    costReduction: string;
    carbonReduction: string;
  };
  slug: string;
}

const ProjectShowcase = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projects: Project[] = [
    {
      id: '1',
      title: "Commercial Solar Installation",
      category: "Commercial",
      description: "A 500kW solar power system for a commercial complex, providing 70% of their energy needs.",
      client: "Commercial Complex",
      location: "Nairobi, Kenya",
      completionDate: "January 2025",
      image: "/images/solar-power-power-station.jpg",
      metrics: {
        energySavings: "70% of energy needs",
        costReduction: "$75,000/year",
        carbonReduction: "350 tons/year"
      },
      slug: "commercial-solar-installation"
    },
    {
      id: '2',
      title: "Industrial Microgrid Project",
      category: "Industrial",
      description: "Custom microgrid solution with 1.2MW capacity for manufacturing facility, ensuring 24/7 power reliability.",
      client: "Manufacturing Facility",
      location: "Lagos, Nigeria",
      completionDate: "February 2025",
      image: "/images/foreman-businessman-solar-energy-station.jpg",
      metrics: {
        energySavings: "24/7 power reliability",
        costReduction: "$210,000/year",
        carbonReduction: "820 tons/year"
      },
      slug: "industrial-microgrid-project"
    },
    {
      id: '3',
      title: "Hospital Backup Power System",
      category: "Healthcare",
      description: "Critical power backup system for a major hospital, providing uninterrupted power to essential services.",
      client: "Major Hospital",
      location: "Accra, Ghana",
      completionDate: "March 2025",
      image: "/images/foreman-businessman-solar-energy-station (1).jpg",
      metrics: {
        energySavings: "Uninterrupted power to essential services",
        costReduction: "$65,000/year",
        carbonReduction: "240 tons/year"
      },
      slug: "hospital-backup-power-system"
    }
  ];

  const handlePrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our <span className="text-gradient">Featured Projects</span></h2>
        
        <div className="relative overflow-hidden">
          <div className={`card-apple max-w-6xl mx-auto transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="grid md:grid-cols-2 gap-0">
              <div className="img-hover-zoom h-[400px] relative overflow-hidden">
                <Image
                  src={projects[activeProject].image}
                  alt={projects[activeProject].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-orange-500">{projects[activeProject].location}</span>
                    <h3 className="text-2xl font-bold mt-1">{projects[activeProject].title}</h3>
                  </div>
                  
                  <p className="text-gray-600">{projects[activeProject].description}</p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <span className="text-xs text-gray-500">CAPACITY</span>
                      <p className="text-lg font-semibold">{projects[activeProject].metrics.energySavings}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <span className="text-xs text-gray-500">ANNUAL OUTPUT</span>
                      <p className="text-lg font-semibold">{projects[activeProject].metrics.costReduction}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <span className="text-xs text-gray-500">COST SAVINGS</span>
                      <p className="text-lg font-semibold">{projects[activeProject].metrics.carbonReduction}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <span className="text-xs text-gray-500">CO₂ REDUCTION</span>
                      <p className="text-lg font-semibold">{projects[activeProject].metrics.carbonReduction}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={handlePrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-all"
            aria-label="Previous project"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-all"
            aria-label="Next project"
          >
            <FaChevronRight />
          </button>
          
          {/* Project indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setActiveProject(index);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeProject === index ? 'bg-orange-500 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
