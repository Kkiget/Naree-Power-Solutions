import Link from "next/link";
import { FaBriefcase, FaUsers, FaGraduationCap } from 'react-icons/fa';

export default function Careers() {
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
              Join Our Team
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We&apos;re looking for talented individuals who share our passion for sustainable energy and innovation. Join us in our mission to transform India&apos;s energy landscape through cutting-edge power solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#696969]">Why Join Naree Power Solutions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaUsers,
                title: "Great Culture",
                description: "Join a diverse team of experts passionate about power solutions"
              },
              {
                icon: FaGraduationCap,
                title: "Growth Opportunities",
                description: "Continuous learning and development programs"
              },
              {
                icon: FaBriefcase,
                title: "Impactful Work",
                description: "Make a real difference in Kenya's power infrastructure"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="text-4xl text-orange-500 mb-4 flex justify-center">
                  <benefit.icon />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#696969]">{benefit.title}</h3>
                <p className="text-[#696969]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#696969]">Current Openings</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                title: "Power Systems Engineer",
                location: "Nairobi, Kenya",
                type: "Full-time"
              },
              {
                title: "Electrical Technician",
                location: "Mombasa, Kenya",
                type: "Full-time"
              },
              {
                title: "Project Manager",
                location: "Nairobi, Kenya",
                type: "Full-time"
              }
            ].map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#696969]">{job.title}</h3>
                    <p className="text-[#696969]">{job.location} • {job.type}</p>
                  </div>
                  <Link 
                    href={`/careers/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="mt-4 md:mt-0 inline-flex items-center justify-center px-6 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
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
          <h2 className="text-3xl font-bold text-white mb-6">Don&apos;t See the Right Fit?</h2>
          <p className="text-gray-600 mb-4">
            We&apos;re looking for skilled professionals to join our team.
          </p>
          <p className="text-gray-600">
            We&apos;re committed to your growth and development.
          </p>
          <Link 
            href="/contact-us"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}