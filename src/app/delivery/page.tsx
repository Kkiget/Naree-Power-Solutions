'use client';

import Link from 'next/link';
import { FaTruck, FaExchangeAlt, FaClock, FaShieldAlt } from 'react-icons/fa';

export default function DeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Delivery & Return Policy</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaTruck className="text-4xl text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Nationwide delivery within 2-5 business days</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaExchangeAlt className="text-4xl text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
          <p className="text-gray-600">30-day return policy with hassle-free process</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaClock className="text-4xl text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Delivery Times</h3>
          <p className="text-gray-600">Estimated delivery times vary by location</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaShieldAlt className="text-4xl text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure Packaging</h3>
          <p className="text-gray-600">All items are carefully packed for safe delivery</p>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Information</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-700">Shipping Areas</h3>
              <p className="text-gray-600">We deliver to all major cities and towns in Kenya. Delivery times may vary based on location.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Delivery Charges</h3>
              <p className="text-gray-600">Delivery charges vary based on location and order weight. Free delivery for orders above KSh 50,000.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Delivery Time</h3>
              <p className="text-gray-600">Standard delivery takes 2-5 business days. Express delivery options available for an additional fee.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Return Policy</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-700">Return Process</h3>
              <p className="text-gray-600">Contact our customer service within 30 days of delivery to initiate a return. Items must be in original condition with all packaging.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Refund Policy</h3>
              <p className="text-gray-600">Refunds will be processed within 7-10 business days after we receive the returned item. Shipping fees are non-refundable.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Exclusions</h3>
              <p className="text-gray-600">Custom orders, installed items, and items showing signs of use are not eligible for returns.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-700">Customer Service</h3>
              <p className="text-gray-600">Need help with your order? Contact our customer service team:</p>
              <p className="text-orange-600">+254 712 345 678</p>
              <p className="text-orange-600">support@nareepowersolutions.co.ke</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Business Hours</h3>
              <p className="text-gray-600">Monday to Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link 
          href="/contact" 
          className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
