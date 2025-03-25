import Link from "next/link";
import Image from 'next/image';
import { FaBolt, FaTools, FaLightbulb, FaShieldAlt, FaPlug, FaBatteryFull, FaSolarPanel, FaWater, FaTint, FaCog, FaChartLine, FaClipboardList, FaTachometerAlt, FaCogs, FaChartArea, FaMapMarkedAlt } from 'react-icons/fa';
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import NewsInsights from "@/components/NewsInsights";
import EnergySavingsCalculator from "@/components/EnergySavingsCalc";
import ProjectShowcase from "@/components/ProjectShowcase";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
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
            Empowering Kenya with <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">Reliable Energy</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed tracking-wide text-white">
            Sustainable power solutions for homes, businesses, and communities across the continent
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/services" 
              className="btn-apple btn-primary text-lg font-medium"
            >
              Explore Our Services
            </Link>
            <Link 
              href="/contact-us" 
              className="btn-apple btn-secondary text-lg font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500", label: "Projects Completed", suffix: "+" },
              { number: "10", label: "Years Experience", suffix: "+" },
              { number: "98", label: "Client Satisfaction", suffix: "%" },
              { number: "24/7", label: "Support Available", suffix: "" },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-white text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#696969]">Our <span className="text-gradient">Services</span></h2>
            <p className="text-[#696969] max-w-2xl mx-auto">
              Comprehensive power solutions tailored to your specific needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaSolarPanel,
                title: "Renewable Energy Solutions",
                description: "Design, installation, and maintenance of solar photovoltaic (PV) systems for homes, businesses, and industries"
              },
              {
                icon: FaBatteryFull,
                title: "Power Backup Solutions",
                description: "Supply and installation of UPS systems and battery storage solutions for reliable power supply"
              },
              {
                icon: FaTools,
                title: "Electrical Engineering & Grid Solutions",
                description: "Professional wiring, panel installation, and power distribution services for buildings and industries"
              },
              {
                icon: FaLightbulb,
                title: "Energy Efficiency & Management",
                description: "Comprehensive energy assessments and smart metering systems for optimal energy usage"
              },
              {
                icon: FaCogs,
                title: "Industrial & Commercial Solutions",
                description: "Automation systems and power factor correction for industrial and commercial clients"
              },
              {
                icon: FaMapMarkedAlt,
                title: "Off-Grid & Rural Electrification",
                description: "Design and implementation of off-grid power solutions for rural communities"
              }
            ].map((service, index) => (
              <ServiceCard 
                key={index} 
                icon={service.icon} 
                title={service.title} 
                description={service.description} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects - Using the enhanced ProjectShowcase component */}
      <ProjectShowcase />

      {/* Energy Savings Calculator */}
      <EnergySavingsCalculator />

      {/* Testimonials Section */}
      <Testimonials />

      {/* News & Insights Section */}
      <NewsInsights />

      {/* Newsletter Signup */}
      <Newsletter />

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
}
