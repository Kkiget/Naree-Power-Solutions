'use client';

import Link from 'next/link';
import { FaQuestionCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function FAQPage() {
  const faqs = [
    {
      question: "What types of solar panels do you offer?",
      answer: "We offer a variety of solar panels including monocrystalline, polycrystalline, and thin film technologies from leading manufacturers. Each type has its own advantages in terms of efficiency, cost, and durability.",
    },
    {
      question: "What is your warranty policy?",
      answer: "Most of our solar panels come with a standard 10-year product warranty and a 25-year performance warranty. Inverters typically have a 5-year warranty, extendable to 10 years with additional purchase.",
    },
    {
      question: "Can you help with installation?",
      answer: "Yes, we offer professional installation services for all our products. Our team of certified installers will ensure your system is installed correctly and safely.",
    },
    {
      question: "What financing options are available?",
      answer: "We offer flexible financing options including bank loans, leasing, and payment plans. Our team can help you find the best financing solution for your needs.",
    },
    {
      question: "What maintenance is required for solar systems?",
      answer: "Solar panels require minimal maintenance. Regular cleaning and annual inspections are recommended to ensure optimal performance. We offer maintenance packages for our customers.",
    },
    {
      question: "What happens during power outages?",
      answer: "Grid-tied systems will shut down during power outages for safety reasons. Off-grid and hybrid systems with battery backup will continue to provide power during outages.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaQuestionCircle className="text-4xl text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Solar Systems</h3>
          <p className="text-gray-600">Everything about solar panel installation and maintenance</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaCheckCircle className="text-4xl text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Warranty & Support</h3>
          <p className="text-gray-600">Details about our warranty and customer support</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaTimesCircle className="text-4xl text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Maintenance</h3>
          <p className="text-gray-600">Regular maintenance and system care</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 py-4 last:border-b-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Still Have Questions?</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              If you can't find the answer to your question here, please feel free to contact our customer service team.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center px-6 py-3 bg-white text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
