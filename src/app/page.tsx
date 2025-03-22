import Image from "next/image";
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Who we are</h2>
            <p className="mt-4 text-gray-500">Detra Solar is a certified solar & energy design company...</p>
          </div>
        </div>
      </section>

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
              <div className="bg-gray-300 h-64"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our services</h2>
            <p className="mt-4 text-gray-500">At Detra Solar, we offer a comprehensive range of services...</p>
          </div>
          <div className="bg-gray-300 h-64"></div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by</h2>
            <div className="flex justify-center space-x-8">
              <div className="bg-gray-300 h-16 w-32"></div>
              <div className="bg-gray-300 h-16 w-32"></div>
              <div className="bg-gray-300 h-16 w-32"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our work</h2>
            <p className="mt-4 text-gray-500">Our dedication to excellence and innovation has enabled us to...</p>
          </div>
          <div className="bg-gray-300 h-64"></div>
        </div>
      </section>

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
              <div className="bg-gray-300 h-64"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">PV design worldwide since 2011</h2>
            <div className="bg-gray-300 h-64"></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">News & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-300 h-64"></div>
              <div className="bg-gray-300 h-64"></div>
            </div>
          </div>
        </div>
      </section>

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

      <Footer />
    </div>
  );
}
