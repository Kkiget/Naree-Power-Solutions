"use client";

import { useState } from 'react';
import { FaCalculator, FaLightbulb, FaSolarPanel, FaDollarSign } from 'react-icons/fa';

export default function EnergySavingsCalculator() {
  // State for calculator inputs
  const [monthlyBill, setMonthlyBill] = useState<number>(0);
  const [dailySunlight, setDailySunlight] = useState<number>(5);
  const [systemSize, setSystemSize] = useState<number>(5);
  const [showResults, setShowResults] = useState(false);

  // Calculate estimates
  const calculateSavings = () => {
    // Simple estimation calculation
    const yearlyBill = monthlyBill * 12;
    const potentialSavings = yearlyBill * 0.7 * (dailySunlight / 5) * (systemSize / 5);
    const paybackPeriod = (systemSize * 1000 * 2) / potentialSavings; // Rough estimate of system cost
    
    return {
      monthlySavings: (potentialSavings / 12).toFixed(2),
      yearlySavings: potentialSavings.toFixed(2),
      paybackYears: paybackPeriod.toFixed(1),
      co2Reduction: (systemSize * 1.5 * 365).toFixed(0) // Simple CO2 reduction calculation
    };
  };

  const results = calculateSavings();

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <FaCalculator className="text-4xl text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Energy Savings Calculator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estimate your potential savings with our solar solutions. Enter your details below to see how much you could save.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <FaDollarSign className="text-3xl text-orange-500 mb-3" />
                <h3 className="font-semibold mb-2">Monthly Electricity Bill</h3>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                    className="w-full mr-3"
                  />
                  <span className="text-lg font-semibold">${monthlyBill}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <FaLightbulb className="text-3xl text-orange-500 mb-3" />
                <h3 className="font-semibold mb-2">Daily Sunlight Hours</h3>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={dailySunlight}
                    onChange={(e) => setDailySunlight(parseFloat(e.target.value))}
                    className="w-full mr-3"
                  />
                  <span className="text-lg font-semibold">{dailySunlight} hrs</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <FaSolarPanel className="text-3xl text-orange-500 mb-3" />
                <h3 className="font-semibold mb-2">System Size (kW)</h3>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={systemSize}
                    onChange={(e) => setSystemSize(parseFloat(e.target.value))}
                    className="w-full mr-3"
                  />
                  <span className="text-lg font-semibold">{systemSize} kW</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleCalculate}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Calculate Savings
              </button>
            </div>
            
            {showResults && (
              <div className="mt-8 p-6 bg-green-50 rounded-lg">
                <h3 className="text-xl font-bold text-center mb-4">Your Estimated Savings</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <p className="text-gray-600 mb-1">Monthly Savings</p>
                    <p className="text-2xl font-bold text-green-600">${results.monthlySavings}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <p className="text-gray-600 mb-1">Yearly Savings</p>
                    <p className="text-2xl font-bold text-green-600">${results.yearlySavings}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <p className="text-gray-600 mb-1">Payback Period</p>
                    <p className="text-2xl font-bold text-blue-600">{results.paybackYears} years</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <p className="text-gray-600 mb-1">CO₂ Reduction</p>
                    <p className="text-2xl font-bold text-green-600">{results.co2Reduction} kg/year</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
