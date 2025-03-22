export default function Services() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Web Development</h2>
            <p className="text-gray-600">
              We create modern, responsive websites using the latest technologies.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mobile Apps</h2>
            <p className="text-gray-600">
              We develop cross-platform mobile applications for iOS and Android.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cloud Solutions</h2>
            <p className="text-gray-600">
              We provide secure and scalable cloud infrastructure solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
