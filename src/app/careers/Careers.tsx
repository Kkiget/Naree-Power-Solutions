export default function Careers() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Career</h1>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">Our team is our greatest asset</h2>
          <p className="mt-4 text-gray-500">
            At Detra Solar, we pride ourselves on fostering a dynamic and innovative workforce comprised of highly qualified engineers, business development experts, and a dedicated operations team. Our engineering team includes both senior and junior engineers, creating a balanced environment of experience and fresh perspectives.
          </p>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Open positions</h2>
          <div className="bg-gray-300 h-16 w-full mb-4"></div> {/* Placeholder for position */}
          <a href="#" className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Submit your CV
          </a>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Life at Detra Solar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-300 h-64"></div> {/* Placeholder for image */}
            <div className="bg-gray-300 h-64"></div> {/* Placeholder for image */}
            <div className="bg-gray-300 h-64"></div> {/* Placeholder for image */}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            <a href="#" className="bg-gray-300 h-12 w-12 rounded-full"></a> {/* Placeholder for social icon */}
            <a href="#" className="bg-gray-300 h-12 w-12 rounded-full"></a> {/* Placeholder for social icon */}
            <a href="#" className="bg-gray-300 h-12 w-12 rounded-full"></a> {/* Placeholder for social icon */}
          </div>
        </div>
      </div>
    </div>
  );
}
