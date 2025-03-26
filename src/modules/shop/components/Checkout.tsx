'use client';

import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/utils';
import Link from 'next/link';
import Image from 'next/image';
import { FaCreditCard, FaMobile, FaPaypal, FaTrash, FaArrowLeft } from 'react-icons/fa';

const paymentMethods = [
  { id: 'mpesa', name: 'M-Pesa', icon: FaMobile },
  { id: 'card', name: 'Credit Card', icon: FaCreditCard },
  { id: 'paypal', name: 'PayPal', icon: FaPaypal },
];

export default function Checkout() {
  const { cart, removeFromCart, cartTotal, clearCart } = useShop();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('mpesa');
  
  const shippingCost = 500; // Example amount
  const totalWithShipping = cartTotal + shippingCost;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);
  };
  
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
            step === activeStep 
              ? 'bg-orange-600 text-white' 
              : step < activeStep 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-500'
          }`}>
            {step < activeStep ? '✓' : step}
          </div>
          {step < 3 && (
            <div className={`h-1 w-16 ${step < activeStep ? 'bg-green-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
  
  const renderCartReview = () => (
    <>
      <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold">Cart Items ({cart.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {cart.map(item => (
            <div key={item.id} className="p-4 flex items-center">
              <div className="relative h-16 w-16 mr-4 bg-gray-100 rounded">
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity || 1} x {formatPrice(item.price)}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(item.price * (item.quantity || 1))}</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm mt-1"
                >
                  <FaTrash className="inline mr-1" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span className="font-semibold">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span className="font-semibold">{formatPrice(shippingCost)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
            <span>Total</span>
            <span className="text-orange-600">{formatPrice(totalWithShipping)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Link href="/shop" className="inline-flex items-center text-orange-600 hover:underline">
          <FaArrowLeft className="mr-2" /> Continue Shopping
        </Link>
        <button 
          onClick={() => setActiveStep(2)}
          className="bg-orange-600 text-white py-3 px-6 rounded font-medium hover:bg-orange-700 transition-colors"
        >
          Proceed to Shipping
        </button>
      </div>
    </>
  );
  
  const renderShippingForm = () => (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="firstName">First Name</label>
            <input 
              id="firstName"
              type="text" 
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="lastName">Last Name</label>
            <input 
              id="lastName"
              type="text" 
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="phone">Phone</label>
            <input 
              id="phone"
              type="tel" 
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium" htmlFor="address">Street Address</label>
            <input 
              id="address"
              type="text" 
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="city">City</label>
            <input 
              id="city"
              type="text" 
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="county">County</label>
            <select 
              id="county"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
              required
            >
              <option value="">Select County</option>
              <option value="nairobi">Nairobi</option>
              <option value="mombasa">Mombasa</option>
              <option value="kisumu">Kisumu</option>
              <option value="nakuru">Nakuru</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button 
          type="button"
          onClick={() => setActiveStep(1)}
          className="text-orange-600 hover:underline flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Cart
        </button>
        <button 
          type="submit"
          className="bg-orange-600 text-white py-3 px-6 rounded font-medium hover:bg-orange-700 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
  
  const renderPaymentForm = () => (
    <>
      <h2 className="text-xl font-bold mb-4">Payment Method</h2>
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="mb-6">
          <h3 className="font-medium mb-3">Select Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentMethods.map(method => {
              const Icon = method.icon;
              return (
                <div key={method.id} 
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedPayment === method.id 
                      ? 'border-orange-600 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <div className="flex items-center">
                    <div className={`mr-3 text-xl ${selectedPayment === method.id ? 'text-orange-600' : 'text-gray-500'}`}>
                      <Icon />
                    </div>
                    <span className={selectedPayment === method.id ? 'font-medium' : ''}>{method.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {selectedPayment === 'mpesa' && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium mb-3">M-Pesa Details</h3>
            <p className="text-gray-700 mb-4">
              You will receive an M-Pesa STK push to the phone number you provided.
            </p>
          </div>
        )}
        
        {selectedPayment === 'card' && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium mb-3">Card Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Card Number</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                  placeholder="1234 5678 9012 3456" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Expiry Date</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                    placeholder="MM/YY" 
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">CVV</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                    placeholder="123" 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h3 className="font-medium mb-3">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>{formatPrice(shippingCost)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
          <span>Total</span>
          <span className="text-orange-600">{formatPrice(totalWithShipping)}</span>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button 
          onClick={() => setActiveStep(2)}
          className="text-orange-600 hover:underline flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Shipping
        </button>
        <button 
          onClick={() => setActiveStep(4)}
          className="bg-orange-600 text-white py-3 px-6 rounded font-medium hover:bg-orange-700 transition-colors"
        >
          Place Order
        </button>
      </div>
    </>
  );
  
  const renderOrderConfirmation = () => (
    <div className="text-center py-10">
      <div className="inline-block mb-6 p-6 bg-green-100 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-4">Thank You for Your Order!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your order has been placed successfully. You will receive a confirmation email shortly.
      </p>
      <div className="bg-white rounded-lg shadow mb-6 p-6 max-w-sm mx-auto">
        <h3 className="font-medium mb-3 text-left">Order Details</h3>
        <div className="flex justify-between mb-2 text-left">
          <span>Order Number:</span>
          <span className="font-semibold">NPS-{Math.floor(Math.random() * 90000) + 10000}</span>
        </div>
        <div className="flex justify-between mb-2 text-left">
          <span>Date:</span>
          <span className="font-semibold">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between mb-2 text-left">
          <span>Total:</span>
          <span className="font-semibold">{formatPrice(totalWithShipping)}</span>
        </div>
        <div className="flex justify-between mb-2 text-left">
          <span>Payment Method:</span>
          <span className="font-semibold">
            {paymentMethods.find(m => m.id === selectedPayment)?.name}
          </span>
        </div>
      </div>
      <Link 
        href="/shop"
        className="bg-orange-600 text-white py-3 px-6 rounded font-medium hover:bg-orange-700 transition-colors inline-block"
        onClick={() => clearCart()}
      >
        Continue Shopping
      </Link>
    </div>
  );
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6 text-center">Checkout</h1>
      
      {activeStep < 4 && renderStepIndicator()}
      
      {activeStep === 1 && renderCartReview()}
      {activeStep === 2 && renderShippingForm()}
      {activeStep === 3 && renderPaymentForm()}
      {activeStep === 4 && renderOrderConfirmation()}
    </div>
  );
}
