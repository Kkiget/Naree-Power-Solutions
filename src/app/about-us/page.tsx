import Link from "next/link";
import { FaHistory, FaBullseye, FaHandshake, FaChartLine } from 'react-icons/fa';

export default function AboutUs() {
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
              About Naree Power Solutions
            </h1>
            <p className="text-lg text-[#696969] mb-8">
              Leading the way in innovative power solutions across Africa
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#696969]">Our Story</h2>
              <p className="text-[#696969] mb-4">
                Founded with a vision to transform Africa's power infrastructure, Naree Power Solutions has been at the forefront of innovative electrical engineering and power solutions.
              </p>
              <p className="text-[#696969] mb-4">
                With years of experience and a team of dedicated professionals, we've successfully delivered reliable power solutions to businesses, industries, and communities across the continent.
              </p>
              <p className="text-[#696969]">
                Our commitment to excellence and sustainable practices has made us a trusted partner in the power sector.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 text-white">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: "500+", label: "Projects Completed" },
                  { number: "10+", label: "Years Experience" },
                  { number: "98%", label: "Client Satisfaction" },
                  { number: "24/7", label: "Support Available" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">{stat.number}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#696969]">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: FaHistory,
                title: "Reliability",
                description: "Consistent and dependable power solutions you can count on"
              },
              {
                icon: FaBullseye,
                title: "Excellence",
                description: "Commitment to the highest standards in everything we do"
              },
              {
                icon: FaHandshake,
                title: "Partnership",
                description: "Building lasting relationships with our clients and communities"
              },
              {
                icon: FaChartLine,
                title: "Innovation",
                description: "Continuously improving and adapting to new technologies"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl text-center">
                <div className="text-4xl text-orange-500 mb-4 flex justify-center">
                  <value.icon />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#696969]">{value.title}</h3>
                <p className="text-[#696969]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#696969]">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "John Doe",
                position: "Chief Executive Officer",
                desc: "20+ years of experience in power systems"
              },
              {
                name: "Jane Smith",
                position: "Technical Director",
                desc: "Expert in electrical engineering solutions"
              },
              {
                name: "Mike Johnson",
                position: "Operations Director",
                desc: "Specialist in project management"
              }
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#696969]">{member.name}</h3>
                <p className="text-orange-500 mb-3">{member.position}</p>
                <p className="text-[#696969]">{member.desc}</p>
              </div>
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
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Work Together?</h2>
          <p className="text-[#696969] mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help power your success with our innovative solutions.
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
}
