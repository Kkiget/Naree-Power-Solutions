import Image from 'next/image';

const newsArticles = [
  {
    id: 1,
    title: 'Revolutionizing Energy Access in Rural Africa',
    excerpt: 'How Naree Power Solutions is bringing sustainable energy to remote communities through innovative solar solutions.',
    image: '/images/news/solar-rural.jpg',
    date: 'March 20, 2025',
    readTime: '5 min read',
    category: 'Innovation'
  },
  {
    id: 2,
    title: 'The Future of Green Energy in Africa',
    excerpt: 'Exploring the latest trends and technologies shaping the renewable energy landscape across the continent.',
    image: '/images/news/green-energy.jpg',
    date: 'March 15, 2025',
    readTime: '4 min read',
    category: 'Industry Trends'
  },
  {
    id: 3,
    title: 'Solar Power: A Game Changer for Businesses',
    excerpt: 'Case studies showing how businesses are reducing costs and improving sustainability with solar energy.',
    image: '/images/news/business-solar.jpg',
    date: 'March 10, 2025',
    readTime: '6 min read',
    category: 'Case Studies'
  }
];

export default function NewsAndInsights() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/beautiful-alternative-energy-plant-with-solar-panels.jpg"
            alt="Solar Panels"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              News & Insights
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest developments in renewable energy, industry insights, and success stories from across Africa.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <article key={article.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex-shrink-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-600">
                    {article.category}
                  </p>
                  <div className="mt-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={article.date}>{article.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-24 bg-primary-600 rounded-2xl py-16 px-6 sm:py-24 sm:px-12 lg:px-16">
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay Updated with Industry News
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-100">
              Subscribe to our newsletter to receive the latest updates, insights, and news about renewable energy in Africa.
            </p>
            <form className="mt-8 sm:flex justify-center">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
