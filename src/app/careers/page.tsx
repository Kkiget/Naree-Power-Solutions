export default function Careers() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Careers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600">
              Join our team of talented professionals and work on exciting projects that make a real impact.
            </p>
            <p className="text-gray-600">
              We offer competitive benefits, a collaborative work environment, and opportunities for growth.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Open Positions</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Software Engineer</li>
              <li>• UX/UI Designer</li>
              <li>• Product Manager</li>
              <li>• Data Scientist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
