import Link from "next/link";
import Image from 'next/image';
import { FaBolt, FaTools, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import NewsInsights from "@/components/NewsInsights";
import EnergySavingsCalculator from "@/components/EnergySavingsCalc";
import ProjectShowcase from "@/components/ProjectShowcase";

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
          <div className="absolute inset-0 bg-black bg-opacity-40" /> {/* Lighter overlay for better visibility */}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white fade-in">
          <h1 className="font-display text-display-2xl md:text-display-xl lg:text-display-2xl font-bold mb-8 tracking-tight">
            Empowering Africa with <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">Reliable Energy</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaBolt,
                title: "Power Systems",
                description: "Complete power system design and implementation"
              },
              {
                icon: FaTools,
                title: "Maintenance",
                description: "Preventive and corrective maintenance services"
              },
              {
                icon: FaLightbulb,
                title: "Energy Efficiency",
                description: "Smart solutions for optimal power usage"
              },
              {
                icon: FaShieldAlt,
                title: "Safety & Quality",
                description: "Adherence to international safety standards"
              }
            ].map((service, index) => (
              <div key={index} className="card-apple hover:scale-105 p-8 transition-all duration-300">
                <div className="text-5xl text-orange-500 mb-4">
                  <service.icon />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#696969]">{service.title}</h3>
                <p className="text-[#696969]">{service.description}</p>
              </div>
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
