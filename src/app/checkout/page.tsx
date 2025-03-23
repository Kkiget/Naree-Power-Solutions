import Link from "next/link";
import { FaCreditCard, FaShieldAlt, FaClock } from 'react-icons/fa';

export default function Checkout() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Secure Checkout
          </h1>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* Progress Steps */}
              <div className="flex justify-between mb-8">
                {[
                  { title: "Information", active: true },
                  { title: "Payment", active: false },
                  { title: "Confirmation", active: false }
                ].map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.active ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-2 ${
                      step.active ? 'text-gray-900 font-semibold' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    {index < 2 && (
                      <div className="w-12 h-px bg-gray-300 mx-4" />
                    )}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Select a service</option>
                    <option value="power-systems">Power Systems</option>
                    <option value="maintenance">Maintenance Service</option>
                    <option value="energy-audit">Energy Audit</option>
                    <option value="installation">Installation Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: FaShieldAlt,
                  title: "Secure Payment",
                  description: "Your payment information is protected"
                },
                {
                  icon: FaClock,
                  title: "Quick Process",
                  description: "Fast and efficient checkout experience"
                },
                {
                  icon: FaCreditCard,
                  title: "Multiple Options",
                  description: "Various payment methods accepted"
                }
              ].map((badge, index) => (
                <div key={index} className="flex items-center bg-white rounded-lg p-4">
                  <div className="text-2xl text-orange-500 mr-4">
                    <badge.icon />
                  </div>
                  <div>
                    <h3 className="font-semibold">{badge.title}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
