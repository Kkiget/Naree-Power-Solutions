import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Commercial Solar Installation',
    location: 'Nairobi, Kenya',
    description: 'A comprehensive solar power system for a major retail complex, featuring rooftop panels and advanced monitoring systems.',
    image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
    metrics: {
      capacity: '250 kW',
      savings: '45% reduction',
      ROI: '3.5 years'
    },
    category: 'Commercial'
  },
  {
    id: 2,
    title: 'Industrial Power Solution',
    location: 'Mombasa, Kenya',
    description: 'Integrated solar and storage solution for a manufacturing facility, ensuring continuous operations and significant cost savings.',
    image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
    metrics: {
      capacity: '400 kW',
      backup: '8 hours',
      savings: '60%'
    },
    category: 'Industrial'
  },
  {
    id: 3,
    title: 'Residential Solar Project',
    location: 'Nairobi, Kenya',
    description: 'Modern solar installation for a residential complex, providing clean and reliable power to multiple households.',
    image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
    metrics: {
      capacity: '100 kW',
      homes: '25 units',
      savings: '40%'
    },
    category: 'Residential'
  }
];

const stats = [
  { id: 1, name: 'Projects Completed', value: '25+' },
  { id: 2, name: 'kW Installed', value: '750+' },
  { id: 3, name: 'Energy Cost Savings', value: '40-60%' },
  { id: 4, name: 'Client Satisfaction', value: '100%' },
];

export default function OurWork() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/solar-panels-roof-solar-cell.jpg"
            alt="Solar Installation"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Our Work
            </h1>
            <p className="mt-6 text-xl text-white max-w-3xl mx-auto">
              Discover our portfolio of successful renewable energy projects across Kenya. From solar installations to power backup solutions, we've helped businesses and communities achieve energy independence.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center">
                <dt className="text-base font-semibold leading-7 text-taupe-dark">
                  {stat.name}
                </dt>
                <dd className="text-4xl font-bold leading-9 tracking-tight text-primary-600">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-taupe-dark sm:text-4xl">Featured Projects</h2>
            <p className="mt-6 text-lg leading-8 text-taupe">
              Explore our most impactful renewable energy installations across Kenya
            </p>
          </div>
          <div className="mt-16 space-y-20 lg:space-y-20">
            {projects.map((project) => (
              <article key={project.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <span className="text-taupe-dark font-medium">{project.location}</span>
                    <span className="relative z-10 rounded-full bg-primary-50 px-3 py-1.5 font-medium text-primary-800 hover:bg-primary-100">
                      {project.category}
                    </span>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-taupe-dark">
                      <span className="absolute inset-0" />
                      {project.title}
                    </h3>
                    <p className="mt-5 text-base leading-6 text-taupe">{project.description}</p>
                  </div>
                  <div className="mt-6 flex border-t border-gray-900/10 pt-6">
                    {Object.entries(project.metrics).map(([key, value], idx) => (
                      <div key={key} className={`${idx > 0 ? 'ml-8' : ''} flex gap-x-2`}>
                        <dt className="text-sm font-medium leading-6 text-taupe-dark">{key}:</dt>
                        <dd className="text-sm font-semibold leading-6 text-primary-800">{value}</dd>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Energy Future?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white">
              Let's discuss how we can help you achieve energy independence and sustainability with our proven solutions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact-us"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Us
              </a>
              <a href="/services" className="text-sm font-semibold leading-6 text-white hover:text-primary-50">
                Learn More <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
