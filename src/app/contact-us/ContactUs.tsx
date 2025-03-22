export default function ContactUs() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Headquarters</h2>
            <p className="mt-4 text-gray-500">
              Karaliaus Mindaugo pr. 38-8, Tower, Kaunas, Lithuania
            </p>
            <p className="mt-2 text-gray-500">
              <strong>Company No:</strong> 304466169<br />
              <strong>VAT No:</strong> LT100010081918<br />
              <strong>Legal Address:</strong> Laisvės al. 3-7, LT-04230 Vilnius
            </p>
            <p className="mt-2 text-gray-500">
              <strong>Email:</strong> marketing@detrasolar.com
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Register for an online consultation</h2>
            <p className="mt-4 text-gray-500">
              If you'd like to discuss your upcoming projects or learn more about our services, please reach out to us.
            </p>
            <div className="bg-gray-300 h-64 mt-4"></div> {/* Placeholder for meeting scheduler */}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Contact Us</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="border p-2 w-full" />
              <input type="text" placeholder="Last Name" className="border p-2 w-full" />
            </div>
            <input type="email" placeholder="Work Email" className="border p-2 w-full" />
            <input type="text" placeholder="Company Name" className="border p-2 w-full" />
            <textarea placeholder="Let us know what you would like to discuss" className="border p-2 w-full"></textarea>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>I'm not a robot</span>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            <a href="#" className="bg-gray-300 h-12 w-12 rounded-full"></a> {/* Placeholder for social icon */}
            <a href="#" className="bg-gray-300 h-12 w-12 rounded-full"></a> {/* Placeholder for social icon */}
            <a href="#" className="bg-gray-300 h-12 w-12 rounded-full"></a> {/* Placeholder for social icon */}
          </div>
        </div>
      </div>
    </div>
  );
}
