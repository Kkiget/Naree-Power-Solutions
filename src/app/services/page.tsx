import React from "react";

const Services = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Our Services</h1>
      </section>

      {/* Specialization Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold">We <span className="text-blue-600">specialize</span></h2>
            <p className="mt-4">Detra Solar is a Solar & Storage Design and Engineering services firm that specializes in providing top-notch services to its clients. With a team of experienced engineers and designers, we are committed to delivering high-quality solutions that meet the unique needs of each project.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">ISO900 & ISO9110 <span className="text-blue-600">certified</span></h2>
            <p className="mt-4">We are proud to be ISO 9001 certified, showcasing our commitment to the highest quality standards in the industry. Our certification demonstrates our dedication to continuous improvement and customer satisfaction.</p>
          </div>
        </div>
      </section>

      {/* Services Provided */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-xl font-bold text-center">We <span className="text-blue-600">provide</span></h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {["Basic/Conceptual Design Services", "Drawings for Planning Application", "Design Services for Tenders / Front End Engineering Design (FEED)", "Execution/Detailed Design Service", "Design Optimisation", "Dedicated Design Engineering Support", "Owner’s Engineering"].map((service, index) => (
              <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
                <h3 className="font-bold text-lg">{service}</h3>
                <p className="mt-2 text-gray-600">Description for {service} goes here...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
        <img src="/team-meeting.jpg" alt="Team Meeting" className="w-1/2 rounded-lg" />
        <div className="md:ml-8 mt-6 md:mt-0">
          <h2 className="text-xl font-bold">Ready to discuss <span className="text-blue-600">your project?</span></h2>
          <p className="mt-4">Our team of experts is ready to provide tailored solutions and support to help you achieve your goals. Get in touch with us today to learn more about how we can help.</p>
          <button className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-lg">Contact Us</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-lg font-bold">Detra Solar</h3>
            <p className="mt-2">Solar engineering company specializing in Solar & Storage design and engineering services.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="mt-2 space-y-1">
              {["Basic/Conceptual Design Services", "Design Optimisation", "Drawings for Planning Application"].map((service, index) => (
                <li key={index} className="text-gray-400">{service}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="mt-2 space-y-1">
              {["About Us", "Services", "News", "Career", "Contact Us"].map((link, index) => (
                <li key={index} className="text-gray-400">{link}</li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;
