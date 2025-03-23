import Link from "next/link";
import { FaBolt, FaTools, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Empowering Africa with <span className="text-orange-500">Reliable</span> Energy
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Your trusted partner in comprehensive power solutions and electrical engineering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact-us" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Get a Quote
            </Link>
            <Link 
              href="/services" 
              className="border-2 border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Our Services
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
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all">
                <div className="text-5xl text-orange-500 mb-4">
                  <service.icon />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recent Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Delivering excellence in power solutions across Africa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Industrial Power System", desc: "Complete factory power solution", color: "from-blue-600 to-blue-800" },
              { title: "Backup Power Installation", desc: "24/7 power backup system", color: "from-orange-600 to-orange-800" },
              { title: "Energy Audit & Upgrade", desc: "Power efficiency improvement", color: "from-green-600 to-green-800" }
            ].map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl h-72">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                <div className="relative h-full p-6 flex flex-col justify-end text-white">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-white/80">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/our-work" 
              className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold"
            >
              View All Projects
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Need Power Solutions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you achieve reliable and efficient power systems for your business
          </p>
          <Link 
            href="/contact-us" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold inline-block transition-all"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </main>
  );
}
