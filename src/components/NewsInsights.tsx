"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NewsInsights = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const articles = [
    {
      id: 1,
      title: "The Future of Solar Energy in Africa",
      excerpt: "How technological advancements and decreasing costs are making solar energy the ideal solution for Africa's energy challenges.",
      date: "March 15, 2025",
      image: "/images/engineer-electric-woman-checking-maintenance-solar-cells.jpg",
      category: "Trends",
      slug: "future-of-solar-energy-africa"
    },
    {
      id: 2,
      title: "Innovative Battery Storage Solutions",
      excerpt: "Exploring the latest developments in battery technology and how they're improving energy storage capabilities.",
      date: "February 28, 2025",
      image: "/images/photovoltaics-solar-power-station-energy-from-natural.jpg",
      category: "Technology",
      slug: "innovative-battery-storage-solutions"
    },
    {
      id: 3,
      title: "Off-Grid Solutions for Rural Communities",
      excerpt: "How microgrids and standalone systems are bringing electricity to previously unserved areas across the continent.",
      date: "February 12, 2025",
      image: "/images/beautiful-alternative-energy-plant-with-solar-panels.jpg",
      category: "Case Study",
      slug: "off-grid-solutions-rural-communities"
    }
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-lg mb-4 text-gray-900">
            News & <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest developments in renewable energy and power solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div 
              key={article.id}
              className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02] ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300">
                <p className="text-orange-400 font-medium mb-2 font-display">{article.date}</p>
                <h3 className="font-display text-xl text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-300 line-clamp-2 font-light">
                  {article.excerpt}
                </p>
              </div>
              <Link 
                href={`/news-and-insights/${article.slug}`}
                className="absolute inset-0 z-30"
                aria-label={`Read more about ${article.title}`}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/news-and-insights" 
            className="btn-apple btn-primary"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsInsights;
