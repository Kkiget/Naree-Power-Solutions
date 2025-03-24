"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <Image 
                src="/images/NAREE POWER 3B.png" 
                alt="Naree Power Logo" 
                width={240} 
                height={80}
                className="h-20 w-auto"
              />
              <p className="text-gray-400 text-sm -mt-1">Your trusted partner in comprehensive power solutions and renewable energy systems across Africa, delivering reliability and sustainability.</p>
            </div>
            <div className="flex mt-6 space-x-4">
              {[
                { icon: FaFacebook, label: "Facebook" },
                { icon: FaTwitter, label: "Twitter" },
                { icon: FaInstagram, label: "Instagram" },
                { icon: FaLinkedin, label: "LinkedIn" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white relative pb-4 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-12 before:h-1 before:bg-orange-500 before:rounded-full">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                "Power Systems",
                "Maintenance Services",
                "Energy Efficiency",
                "Safety & Quality",
                "Solar Installations",
                "Energy Audits"
              ].map((service, index) => (
                <li 
                  key={index} 
                  className="text-gray-400 hover:text-white group transition-all duration-300"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Link 
                    href="/services" 
                    className="inline-flex items-center group"
                  >
                    <span className="transform transition-transform duration-300 group-hover:translate-x-2">
                      {service}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white relative pb-4 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-12 before:h-1 before:bg-orange-500 before:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", link: "/about-us" },
                { name: "Our Work", link: "/our-work" },
                { name: "News & Insights", link: "/news-and-insights" },
                { name: "Careers", link: "/careers" },
                { name: "Shop", link: "/shop" },
                { name: "Contact Us", link: "/contact-us" }
              ].map((link, index) => (
                <li 
                  key={index} 
                  className="text-gray-400 hover:text-white group transition-all duration-300"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Link 
                    href={link.link} 
                    className="inline-flex items-center group"
                  >
                    <span className="transform transition-transform duration-300 group-hover:translate-x-2">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white relative pb-4 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-12 before:h-1 before:bg-orange-500 before:rounded-full">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 group hover:text-white transition-colors duration-300">
                <span className="mt-1 text-orange-500"><FaMapMarkerAlt /></span>
                <span>123 Main Street, Nairobi, Kenya</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 group hover:text-white transition-colors duration-300">
                <span className="mt-1 text-orange-500"><FaPhone /></span>
                <span>+254 123 456 789</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 group hover:text-white transition-colors duration-300">
                <span className="mt-1 text-orange-500"><FaEnvelope /></span>
                <span>info@nareepower.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 group hover:text-white transition-colors duration-300">
                <span className="mt-1 text-orange-500"><FaClock /></span>
                <span>Monday-Friday: 8am - 5pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Naree Power Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
