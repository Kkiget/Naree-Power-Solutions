import React from "react";
import Link from "next/link";
import { FaSolarPanel, FaBatteryFull, FaTools, FaLightbulb, FaCogs, FaMapMarkedAlt } from 'react-icons/fa';

const ServiceCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ComponentType<{ className?: string }> }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
      <div className="text-4xl text-orange-500 mb-4 flex justify-center">
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Services = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full parallax">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Comprehensive power solutions tailored to your specific needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard 
                icon={FaSolarPanel}
                title="Renewable Energy Solutions"
                description="Design, installation, and maintenance of solar photovoltaic (PV) systems for homes, businesses, and industries"
              />
              <ServiceCard 
                icon={FaBatteryFull}
                title="Power Backup Solutions"
                description="Supply and installation of UPS systems and battery storage solutions for reliable power supply"
              />
              <ServiceCard 
                icon={FaTools}
                title="Electrical Engineering & Grid Solutions"
                description="Professional wiring, panel installation, and power distribution services for buildings and industries"
              />
              <ServiceCard 
                icon={FaLightbulb}
                title="Energy Efficiency & Management"
                description="Comprehensive energy assessments and smart metering systems for optimal energy usage"
              />
              <ServiceCard 
                icon={FaCogs}
                title="Industrial & Commercial Solutions"
                description="Automation systems and power factor correction for industrial and commercial clients"
              />
              <ServiceCard 
                icon={FaMapMarkedAlt}
                title="Off-Grid & Rural Electrification"
                description="Design and implementation of off-grid power solutions for rural communities"
              />
            </section>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/40 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to <span className="text-gradient">Transform</span> Your Energy?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-light text-white">
            Let us help you achieve reliable and efficient power systems for your business or home
          </p>
          <Link 
            href="/contact-us" 
            className="btn-apple btn-primary"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
