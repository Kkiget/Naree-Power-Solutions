import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Welcome to Your Website
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              Create something amazing with Next.js and Tailwind CSS
            </p>
            <div className="mt-10">
              <a href="#features" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Features</h2>
            <p className="mt-4 text-gray-500">Everything you need to create amazing websites</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Fast Performance",
                description: "Optimized for speed and efficiency with Next.js"
              },
              {
                icon: "🎨",
                title: "Beautiful Design",
                description: "Modern and responsive design with Tailwind CSS"
              },
              {
                icon: "⚡",
                title: "Easy to Use",
                description: "Simple and intuitive development experience"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
