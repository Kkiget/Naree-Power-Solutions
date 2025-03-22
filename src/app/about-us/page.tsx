export default function AboutUs() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600">
              We are a passionate team dedicated to creating innovative solutions that make a difference.
            </p>
            <p className="text-gray-600">
              Our mission is to deliver exceptional products and services that exceed our clients' expectations.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Innovation and Creativity</li>
              <li>• Integrity and Transparency</li>
              <li>• Customer-Centric Approach</li>
              <li>• Continuous Improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
