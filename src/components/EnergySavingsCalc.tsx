"use client";

import { useState, useEffect, useCallback } from 'react';

const EnergySavingsCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState(200);
  const [sunlightHours, setSunlightHours] = useState(5);
  const [systemSize, setSystemSize] = useState(5);
  const [savings, setSavings] = useState({ monthly: 0, annual: 0, twentyYear: 0 });
  const [touched, setTouched] = useState(false);
  
  const calculateSavings = useCallback(() => {
    // Basic formula: Monthly bill reduction based on system size and sunlight hours
    const monthlyReduction = monthlyBill * (systemSize * sunlightHours) / 100;
    const monthlySavings = Math.min(monthlyReduction, monthlyBill * 0.9); // Cap at 90% of bill
    
    setSavings({
      monthly: parseFloat(monthlySavings.toFixed(2)),
      annual: parseFloat((monthlySavings * 12).toFixed(2)),
      twentyYear: parseFloat((monthlySavings * 12 * 20).toFixed(2))
    });
  }, [monthlyBill, sunlightHours, systemSize]);
  
  // Calculate savings whenever inputs change
  useEffect(() => {
    calculateSavings();
  }, [calculateSavings]);
  
  const handleTouch = () => {
    if (!touched) setTouched(true);
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#696969]">
              Calculate Your <span className="text-gradient">Energy Savings</span>
            </h2>
            <p className="text-[#696969] text-lg max-w-2xl mx-auto">
              See how much you could save by switching to solar power with our solutions
            </p>
          </div>
          
          <div className="card-apple p-8 md:p-10">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-5 space-y-8">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-[#333333]">
                    Monthly Electricity Bill ($)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="10"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                      onClick={handleTouch}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$50</span>
                      <span>$1000</span>
                    </div>
                    <div className="mt-2 text-center text-2xl font-semibold text-gray-800">
                      ${monthlyBill}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-[#333333]">
                    Average Daily Sunlight Hours
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="2"
                      max="8"
                      step="0.5"
                      value={sunlightHours}
                      onChange={(e) => setSunlightHours(parseFloat(e.target.value))}
                      onClick={handleTouch}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>2h</span>
                      <span>8h</span>
                    </div>
                    <div className="mt-2 text-center text-2xl font-semibold text-gray-800">
                      {sunlightHours} hours
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-[#333333]">
                    System Size (kW)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="0.5"
                      value={systemSize}
                      onChange={(e) => setSystemSize(parseFloat(e.target.value))}
                      onClick={handleTouch}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1kW</span>
                      <span>20kW</span>
                    </div>
                    <div className="mt-2 text-center text-2xl font-semibold text-gray-800">
                      {systemSize} kW
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-7 flex flex-col justify-center">
                <div className={`rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white shadow-lg transition-all duration-700 ${touched ? 'opacity-100 transform translate-y-0' : 'opacity-95 transform translate-y-4'}`}>
                  <h3 className="text-xl font-bold mb-6">Your Estimated Savings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/20 pb-4">
                      <p className="text-white mb-1">Monthly Savings:</p>
                      <span className="text-2xl font-bold">${savings.monthly}</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-white/20 pb-4">
                      <p className="text-white mb-1">Annual Savings:</p>
                      <span className="text-2xl font-bold">${savings.annual}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2">
                      <p className="text-white mb-1">20 Year Savings:</p>
                      <span className="text-3xl font-bold">${savings.twentyYear.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <a href="/contact-us" className="block text-center bg-white text-orange-600 py-3 px-6 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105">
                      Get a Free Consultation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center text-[#696969] text-sm">
            <p>This calculator provides estimates based on average values. Actual savings may vary based on your specific location, energy usage patterns, and local electricity rates.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergySavingsCalculator;
