export default function AboutUs() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        <div className="bg-gray-300 h-64 mt-10 mx-auto"></div> {/* Placeholder for image */}
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Who we are</h2>
            <p className="mt-4 text-gray-500">
              Detra Solar is a Solar & Storage Design and Engineering services firm. We work with EPCs, project developers, and investors into solar energy globally. Prioritizing quality, we offer bespoke solutions for short-term savings and long-term profitability.
            </p>
            <a href="#" className="text-orange-500">Contact us for more information</a>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Our History</h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-gray-300 h-32 w-32"></div> {/* Placeholder for timeline image */}
            <div className="bg-gray-300 h-32 w-32"></div> {/* Placeholder for timeline image */}
            <div className="bg-gray-300 h-32 w-32"></div> {/* Placeholder for timeline image */}
          </div>
          <p className="mt-4 text-gray-500 text-center">
            Detra Solar was founded in 2011 in Germany, and since then, it has expanded its presence with offices in three more countries and a team of 200 dedicated employees. Over the years, we have successfully launched innovative projects in more than 50 countries, making us a global leader in solar and storage design, engineering, and consulting services.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">PV design worldwide since 2011</h2>
            <div className="bg-gray-300 h-64"></div> {/* Placeholder for map */}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Our leadership team</h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-gray-300 h-64 w-48"></div> {/* Placeholder for team member */}
            <div className="bg-gray-300 h-64 w-48"></div> {/* Placeholder for team member */}
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our values</h2>
            <p className="mt-4 text-gray-500">
              We Build from the Ground Up: At Detra Solar, we believe in building every project from the ground up, ensuring that each solution is tailored to meet the unique needs of our clients. Our commitment to quality and innovation drives us to deliver exceptional results that exceed expectations.
            </p>
            <p className="mt-4 text-gray-500">
              We take ownership: Detra Solar takes full responsibility for each project, ensuring that every detail is meticulously planned and executed. Our team of experts works closely with clients to ensure that their vision is brought to life with precision and care.
            </p>
            <p className="mt-4 text-gray-500">
              We are driven by excellence: Excellence is at the core of everything we do at Detra Solar. Our dedication to continuous improvement and innovation ensures that we remain at the forefront of the industry, delivering solutions that set new standards for quality and performance.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by</h2>
            <div className="flex justify-center space-x-8">
              <div className="bg-gray-300 h-16 w-32"></div> {/* Placeholder for logo */}
              <div className="bg-gray-300 h-16 w-32"></div> {/* Placeholder for logo */}
              <div className="bg-gray-300 h-16 w-32"></div> {/* Placeholder for logo */}
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Ready to discuss your project?</h2>
            <a href="#" className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
