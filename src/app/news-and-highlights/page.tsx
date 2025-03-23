import Link from "next/link";
import { FaNewspaper, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

export default function NewsAndHighlights() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 pt-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              News & Highlights
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Stay updated with the latest from Naree Power Solutions
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "New Power Plant Launch",
                date: "2025-03-15",
                description: "We've successfully launched our new 50MW power plant in Nairobi",
                image: "/images/news-1.jpg",
                link: "/news/new-power-plant-launch"
              },
              {
                title: "Energy Efficiency Seminar",
                date: "2025-02-28",
                description: "Join our free seminar on energy efficiency best practices",
                image: "/images/news-2.jpg",
                link: "/news/energy-efficiency-seminar"
              },
              {
                title: "Annual Report 2024",
                date: "2025-01-15",
                description: "Our 2024 annual report is now available for download",
                image: "/images/news-3.jpg",
                link: "/news/annual-report-2024"
              }
            ].map((news, index) => (
              <Link key={index} href={news.link}>
                <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-200 to-gray-300">
                    <img src={news.image} alt={news.title} className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FaCalendarAlt className="mr-2" />
                      {new Date(news.date).toLocaleDateString()}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{news.title}</h3>
                    <p className="text-gray-600">{news.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Stay Connected</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates and industry insights
          </p>
          <Link 
            href="/subscribe"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Subscribe Now
          </Link>
        </div>
      </section>
    </main>
  );
}