import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Engineering the blueprint for our solar-powered world.
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              We are a global solar & energy design, engineering, and consulting firm.
            </p>
            <div className="mt-10">
              <a href="#our-story" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Watch Video
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center">
            About Us
          </h1>
          <div className="bg-gray-300 h-64 mt-10 mx-auto"></div> {/* Placeholder for image */}
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Who we are</h2>
            <p className="mt-4 text-gray-500">Detra Solar is a certified solar & energy design company...</p>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Our History</h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-gray-300 h-32 w-32"></div> {/* Placeholder for timeline image */}
            <div className="bg-gray-300 h-32 w-32"></div> {/* Placeholder for timeline image */}
            <div className="bg-gray-300 h-32 w-32"></div> {/* Placeholder for timeline image */}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="w-1/2">
              <h2 className="text-3xl font-bold text-gray-900">Our story</h2>
              <p className="mt-4 text-gray-500">We've powered 21 million households with clean and sustainable energy...</p>
              <a href="#" className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Read more
              </a>
            </div>
            <div className="w-1/2">
              <div className="bg-gray-300 h-64"></div> {/* Placeholder for image */}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Header Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center">
            Our Services
          </h1>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">We specialize</h2>
            <p className="mt-4 text-gray-500">Detra Solar is a Solar & Storage Design and Engineering services firm...</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-10">ISO9000 & ISO9110 certified</h2>
            <p className="mt-4 text-gray-500">We are proud to be ISO 9001 certified, showcasing our commitment to the highest quality standards...</p>
          </div>
        </div>
      </section>

      {/* Services Provided Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">We provide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="bg-gray-300 h-16 w-16 mb-4 mx-auto"></div> {/* Placeholder for icon */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic/Conceptual Design Services</h3>
              <p className="text-gray-500">Our Basic/Conceptual Design services provide essential insights...</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="bg-gray-300 h-16 w-16 mb-4 mx-auto"></div> {/* Placeholder for icon */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Drawings for Planning Application</h3>
              <p className="text-gray-500">Our Drawings for Planning Application service provides detailed insights...</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="bg-gray-300 h-16 w-16 mb-4 mx-auto"></div> {/* Placeholder for icon */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Services for Tenders</h3>
              <p className="text-gray-500">Our Tendering Design Service is tailored to meet the specific requirements...</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="bg-gray-300 h-16 w-16 mb-4 mx-auto"></div> {/* Placeholder for icon */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Execution/Detailed Design Service</h3>
              <p className="text-gray-500">Our Execution/Detailed Design service offers a comprehensive Full Turn-Key Design package...</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="bg-gray-300 h-16 w-16 mb-4 mx-auto"></div> {/* Placeholder for icon */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Optimisation</h3>
              <p className="text-gray-500">Design Optimisation service is focused on maintaining the efficiency...</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="bg-gray-300 h-16 w-16 mb-4 mx-auto"></div> {/* Placeholder for icon */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dedicated Design Engineering Support</h3>
              <p className="text-gray-500">Detra Solar facilitates a dedicated project/design engineer to provide support...</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="bg-gray-300 h-16 w-16 mb-4 mx-auto"></div> {/* Placeholder for icon */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Owner's Engineering</h3>
              <p className="text-gray-500">Detra Solar offers comprehensive Owner's Engineering services to provide expert oversight...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">PV design worldwide since 2011</h2>
            <div className="bg-gray-300 h-64"></div> {/* Placeholder for map */}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Our leadership team</h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-gray-300 h-64 w-48"></div> {/* Placeholder for team member */}
            <div className="bg-gray-300 h-64 w-48"></div> {/* Placeholder for team member */}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our values</h2>
            <p className="mt-4 text-gray-500">We build from the ground up...</p>
            <p className="mt-4 text-gray-500">We take ownership...</p>
            <p className="mt-4 text-gray-500">We are driven by excellence...</p>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by</h2>
            <div className="flex justify-center space-x-8">
              <div className="bg-gray-300 h-16 w-32"></div> {/* Placeholder for logo */}
              <div className="bg-gray-300 h-16 w-32"></div> {/* Placeholder for logo */}
              <div className="bg-gray-300 h-16 w-32"></div> {/* Placeholder for logo */}
            </div>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our work</h2>
            <p className="mt-4 text-gray-500">Our dedication to excellence and innovation has enabled us to...</p>
          </div>
          <div className="bg-gray-300 h-64"></div> {/* Placeholder for image */}
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="w-1/2">
              <h2 className="text-3xl font-bold text-gray-900">Case study</h2>
              <p className="mt-4 text-gray-500">Creating dual value in Agrivoltaics...</p>
              <a href="#" className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Read more
              </a>
            </div>
            <div className="w-1/2">
              <div className="bg-gray-300 h-64"></div> {/* Placeholder for image */}
            </div>
          </div>
        </div>
      </section>

      {/* News & Insights Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">News & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-300 h-64"></div> {/* Placeholder for news item */}
              <div className="bg-gray-300 h-64"></div> {/* Placeholder for news item */}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Ready to discuss your project?</h2>
            <a href="#" className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
