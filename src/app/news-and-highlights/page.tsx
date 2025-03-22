export default function NewsAndHighlights() {
  return (
    <div className="min-h-screen py-20">
      <div className="max极客时间-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">News</h1>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-300 h-64"></div> {/* Placeholder for news image */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Harnessing Solar Parks for Biodiversity and Habitat Enhancement</h2>
              <p className="mt-4 text-gray-500">Solar parks are more than just sources of renewable energy...</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-gray-300 h-64"></div> {/* Placeholder for news image */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Case Study: Nordic Solar, Largest Solar Park in Lithuania to Date</h2>
              <p className="mt-4 text-gray-500">Project Overview: Nordic Solar AS developed the largest solar park in Lithuania...</p>
            </div>
          </div>
          {/* Add more news items as needed */}
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Newsletter: Sign up!</h2>
          <form className="flex justify-center">
            <input type="email" placeholder="Email" className="px-4 py-2 border rounded-l-lg" />
            <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded-r-lg hover:bg-orange-600 transition-colors">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Ready to discuss your project?</h2>
            <a href="#" className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}