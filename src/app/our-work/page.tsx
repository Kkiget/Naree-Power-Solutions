import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Work</h1>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our experience</h2>
            <p className="mt-4 text-gray-500">
              Detra Solar is a pioneer in the renewable energy sector, with more than a decade of experience and a track record of 487 GWp of solar projects across 50+ countries. Our team of experts is dedicated to delivering innovative solutions that meet the unique needs of our clients.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mt-10">Our mission & vision</h2>
            <p className="mt-4 text-gray-500">
              Our mission is to provide sustainable energy solutions that empower communities and drive progress. Our vision is to be a global leader in solar and storage design, engineering, and consulting services.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mt-10">ISO9001:2015 Certified</h2>
            <p className="mt-4 text-gray-500">
              We are ISO 9001:2015 certified, reflecting our commitment to quality and excellence in every project we undertake.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Project directory</h2>
          <a href="#" className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            View Projects
          </a>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-300 rounded-lg shadow-md"></div> {/* Placeholder for service */}
            <div className="p-6 bg-gray-300 rounded-lg shadow-md"></div> {/* Placeholder for service */}
            <div className="p-6 bg-gray-300 rounded-lg shadow-md"></div> {/* Placeholder for service */}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Ready to discuss your project?</h2>
            <a href="#" className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
