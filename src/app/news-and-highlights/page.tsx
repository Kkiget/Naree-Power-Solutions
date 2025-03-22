export default function NewsAndHighlights() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">News & Highlights</h1>
        <div className="space-y-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h2>
              <p className="text-gray-500 text-sm mb-4">{article.date}</p>
              <p className="text-gray-600">{article.summary}</p>
              <a href={article.link} className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const articles = [
  {
    title: "Company Wins Innovation Award",
    date: "March 15, 2025",
    summary: "We're proud to announce that our company has been recognized for its innovative solutions in the tech industry.",
    link: "/news/innovation-award"
  },
  {
    title: "New Product Launch",
    date: "February 28, 2025",
    summary: "Our latest product is now available, offering cutting-edge features for our clients.",
    link: "/news/product-launch"
  },
  {
    title: "Partnership Announcement",
    date: "January 10, 2025",
    summary: "We've formed a strategic partnership with a leading technology provider to enhance our offerings.",
    link: "/news/partnership"
  }
];
