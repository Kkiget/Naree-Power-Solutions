import React from "react";
import Link from "next/link";
import { FaBolt, FaTools, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import Footer from '@/components/Footer';

const Services = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 pt-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Comprehensive power solutions tailored to your specific needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaBolt,
                title: "Power Systems",
                description: "Complete power system design and implementation",
                link: "/services/power-systems"
              },
              {
                icon: FaTools,
                title: "Maintenance",
                description: "Preventive and corrective maintenance services",
                link: "/services/maintenance"
              },
              {
                icon: FaLightbulb,
                title: "Energy Efficiency",
                description: "Smart solutions for optimal power usage",
                link: "/services/energy-efficiency"
              },
              {
                icon: FaShieldAlt,
                title: "Safety & Quality",
                description: "Adherence to international safety standards",
                link: "/services/safety-quality"
              }
            ].map((service, index) => (
              <Link key={index} href={service.link}>
                <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all">
                  <div className="text-4xl text-orange-500 mb-4 flex justify-center">
                    <service.icon />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Need Custom Solutions?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your specific power needs and get a tailored solution.
          </p>
          <Link 
            href="/contact-us"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
