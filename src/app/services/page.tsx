import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { 
  FaBolt, 
  FaTools, 
  FaLightbulb, 
  FaShieldAlt, 
  FaSolarPanel, 
  FaBatteryFull, 
  FaWater, 
  FaTint, 
  FaPlug, 
  FaCog, 
  FaChartLine, 
  FaClipboardList, 
  FaTachometerAlt, 
  FaCogs, 
  FaChartArea, 
  FaMapMarkedAlt 
} from 'react-icons/fa';

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
            <Image 
              src="/images/Hero solar-panels-roof-solar-cell.jpg" 
              alt="Solar panels with blue sky and sunset" 
              fill
              priority
              sizes="100vw"
              style={{objectFit: "cover"}}
              className="transition-transform duration-700 ease-out"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white fade-in">
          <h1 className="font-display text-display-2xl md:text-display-xl lg:text-display-2xl font-bold mb-8 tracking-tight">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
            Comprehensive power solutions tailored to your specific needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact-us" 
              className="btn-apple btn-primary text-lg font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Renewable Energy Solutions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard 
                  title="Solar Power Solutions"
                  description="Design, installation, and maintenance of solar PV systems for homes, businesses, and industries."
                  icon={FaSolarPanel}
                />
                <ServiceCard 
                  title="Hybrid Power Systems"
                  description="Integration of solar battery storage and the grid for reliable energy supply."
                  icon={FaBatteryFull}
                />
                <ServiceCard 
                  title="Solar Water Heating Systems"
                  description="Installation and maintenance of solar water heaters for residential and commercial use."
                  icon={FaWater}
                />
                <ServiceCard 
                  title="Solar Pumping Systems"
                  description="Design and installation of solar-powered water pumps for irrigation and domestic use."
                  icon={FaTint}
                />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Power Backup Solutions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard 
                  title="UPS Systems"
                  description="Sales, installation, and maintenance of UPS for critical power backup."
                  icon={FaPlug}
                />
                <ServiceCard 
                  title="Battery Storage Solutions"
                  description="Supply and installation of advanced battery backup systems."
                  icon={FaBatteryFull}
                />
                <ServiceCard 
                  title="Standby Generators"
                  description="Supply, installation, and servicing of diesel, petrol, and biogas generators."
                  icon={FaCog}
                />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Electrical Engineering & Grid Solutions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard 
                  title="Electrical System Design"
                  description="Wiring, panel installations, and power distribution for buildings and industries."
                  icon={FaBolt}
                />
                <ServiceCard 
                  title="Power Quality Audits"
                  description="Identification and correction of power inefficiencies to reduce costs."
                  icon={FaChartLine}
                />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Energy Efficiency & Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard 
                  title="Energy Audits & Consulting"
                  description="Comprehensive energy assessments to improve efficiency and reduce costs."
                  icon={FaClipboardList}
                />
                <ServiceCard 
                  title="LED Lighting Solutions"
                  description="Supply and installation of energy-efficient LED lighting for businesses and homes."
                  icon={FaLightbulb}
                />
                <ServiceCard 
                  title="Smart Metering Systems"
                  description="Implementation of digital metering solutions for real-time energy tracking."
                  icon={FaTachometerAlt}
                />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Industrial & Commercial Solutions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard 
                  title="Industrial Automation"
                  description="Integration of SCADA, PLCs, and other automation technologies."
                  icon={FaCogs}
                />
                <ServiceCard 
                  title="Power Factor Correction"
                  description="Installation of capacitors to improve energy efficiency."
                  icon={FaChartArea}
                />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Off-Grid & Rural Electrification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard 
                  title="Mini-Grid Development"
                  description="Designing and deploying small-scale power grids for remote communities."
                  icon={FaMapMarkedAlt}
                />
              </div>
            </section>
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
          <p className="text-[#333333] mb-8 max-w-2xl mx-auto">
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
    </main>
  );
};

export default Services;
