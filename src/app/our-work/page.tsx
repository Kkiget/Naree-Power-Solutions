export default function OurWork() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Work</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    title: "E-commerce Platform",
    description: "A modern e-commerce solution with seamless user experience.",
    image: "/images/ecommerce.jpg"
  },
  {
    title: "Mobile Banking App",
    description: "Secure and user-friendly mobile banking application.",
    image: "/images/banking.jpg"
  },
  {
    title: "Cloud Migration",
    description: "Enterprise cloud infrastructure migration project.",
    image: "/images/cloud.jpg"
  }
];
