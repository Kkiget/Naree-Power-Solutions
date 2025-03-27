'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FaCreditCard, FaMobile, FaPaypal, FaTrash, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const paymentMethods = [
  { id: 'mpesa', name: 'M-Pesa', icon: FaMobile },
  { id: 'card', name: 'Credit Card', icon: FaCreditCard },
  { id: 'paypal', name: 'PayPal', icon: FaPaypal },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export function Checkout() {
  const { cart, removeFromCart, cartTotal, clearCart, isAuthenticated, currentUser } = useShop();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('mpesa');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    postalCode: '',
  });

  // Redirect to sign in page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign-in?redirect=/checkout');
    }
  }, [isAuthenticated, router]);

  // Redirect to shop if cart is empty
  useEffect(() => {
    if (cart.length === 0 && activeStep < 4) {
      router.push('/shop');
    }
  }, [cart, activeStep, router]);

  // Pre-fill data if user is logged in
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
      }));
    }
  }, [currentUser]);

  const shippingCost = cart.length > 0 ? 500 : 0; // Example amount
  const totalWithShipping = cartTotal + shippingCost;
  
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    // Validate shipping details
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.county) newErrors.county = 'County is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    
    // Validate payment details if on payment step and card is selected
    if (activeStep === 3 && selectedPayment === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvv) newErrors.cardCvv = 'CVV is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (activeStep === 2) {
        setActiveStep(3);
      } else if (activeStep === 3) {
        processPayment();
      }
    }
  };
  
  const processPayment = async () => {
    setLoading(true);
    
    try {
      // This would be replaced with actual payment processing API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random order ID
      const generatedOrderId = `NPS-${Math.floor(Math.random() * 90000) + 10000}`;
      setOrderId(generatedOrderId);
      
      // Clear the cart after successful order
      setActiveStep(4);
    } catch (error) {
      console.error('Payment failed', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setLoading(false);
    }
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
            {step < activeStep ? <FaCheckCircle /> : step}
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
        {cart.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
            <Link href="/shop" className="text-orange-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
      {cart.length > 0 && (
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
      )}
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
              name="firstName"
              type="text" 
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`} 
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="lastName">Last Name</label>
            <input 
              id="lastName"
              name="lastName"
              type="text" 
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`} 
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="email">Email</label>
            <input 
              id="email"
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`} 
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="phone">Phone</label>
            <input 
              id="phone"
              name="phone"
              type="tel" 
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`} 
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium" htmlFor="address">Street Address</label>
            <input 
              id="address"
              name="address"
              type="text" 
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`} 
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="city">City</label>
            <input 
              id="city"
              name="city"
              type="text" 
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`} 
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="county">County</label>
            <select 
              id="county"
              name="county"
              value={formData.county}
              onChange={handleInputChange}
              className={`w-full border ${errors.county ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`} 
            >
              <option value="">Select County</option>
              <option value="nairobi">Nairobi</option>
              <option value="mombasa">Mombasa</option>
              <option value="kisumu">Kisumu</option>
              <option value="nakuru">Nakuru</option>
              <option value="other">Other</option>
            </select>
            {errors.county && <p className="text-red-500 text-sm mt-1">{errors.county}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="postalCode">Postal Code</label>
            <input 
              id="postalCode"
              name="postalCode"
              type="text" 
              value={formData.postalCode}
              onChange={handleInputChange}
              className={`w-full border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`} 
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
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
    <form onSubmit={handleSubmit}>
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
            <div className="bg-orange-50 border border-orange-200 rounded p-4 mb-4">
              <p className="text-sm">
                When you click &quot;Place Order&quot;, an M-Pesa payment request will be sent to <strong>{formData.phone}</strong>.
                Please enter your M-Pesa PIN to complete the transaction.
              </p>
            </div>
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
                  name="cardNumber"
                  value={formData.cardNumber || ''}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  placeholder="1234 5678 9012 3456" 
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Expiry Date</label>
                  <input 
                    type="text" 
                    name="cardExpiry"
                    value={formData.cardExpiry || ''}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    placeholder="MM/YY" 
                  />
                  {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">CVV</label>
                  <input 
                    type="text" 
                    name="cardCvv"
                    value={formData.cardCvv || ''}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.cardCvv ? 'border-red-500' : 'border-gray-300'} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    placeholder="123" 
                  />
                  {errors.cardCvv && <p className="text-red-500 text-sm mt-1">{errors.cardCvv}</p>}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedPayment === 'paypal' && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium mb-3">PayPal</h3>
            <p className="text-gray-700 mb-4">
              You will be redirected to PayPal to complete your payment.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded p-4">
              <p className="text-sm">
                After clicking &quot;Place Order&quot;, you&apos;ll be redirected to PayPal to complete your payment securely.
              </p>
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
          type="button"
          onClick={() => setActiveStep(2)}
          className="text-orange-600 hover:underline flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Shipping
        </button>
        <button 
          type="submit"
          disabled={loading}
          className={`bg-orange-600 text-white py-3 px-6 rounded font-medium ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-700'
          } transition-colors flex items-center`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </form>
  );
  
  const renderOrderConfirmation = () => (
    <div className="text-center py-10">
      <div className="inline-block mb-6 p-6 bg-green-100 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-orange-700">Thank You for Your Order!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your order has been placed successfully. You will receive a confirmation email shortly at <span className="font-medium">{formData.email}</span>.
      </p>
      <div className="bg-white rounded-lg shadow mb-6 p-6 max-w-sm mx-auto">
        <h3 className="font-medium mb-3 text-left text-orange-700">Order Details</h3>
        <div className="flex justify-between mb-2 text-left">
          <span>Order Number:</span>
          <span className="font-semibold">{orderId}</span>
        </div>
        <div className="flex justify-between mb-2 text-left">
          <span>Date:</span>
          <span className="font-semibold">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between mb-2 text-left">
          <span>Total:</span>
          <span className="font-semibold text-orange-700">{formatPrice(totalWithShipping)}</span>
        </div>
        <div className="flex justify-between mb-2 text-left">
          <span>Payment Method:</span>
          <span className="font-semibold">
            {paymentMethods.find(m => m.id === selectedPayment)?.name}
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link 
          href="/account?tab=orders"
          className="bg-gray-100 text-gray-800 py-3 px-6 rounded font-medium hover:bg-gray-200 transition-colors inline-block"
        >
          View Your Orders
        </Link>
        <Link 
          href="/shop"
          className="bg-orange-600 text-white py-3 px-6 rounded font-medium hover:bg-orange-700 transition-colors inline-block"
          onClick={() => {
            // Clear cart only after successful checkout
            clearCart();
            // Ensure the user is taken directly to the product listing
            localStorage.setItem('returnToProducts', 'true');
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
  
  // If not authenticated, show a loading state until redirect happens
  if (!isAuthenticated) {
    return (
      <div className="text-center py-10">
        <p>Please sign in to continue checkout...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {activeStep < 4 && renderStepIndicator()}
      
      {activeStep === 1 && renderCartReview()}
      {activeStep === 2 && renderShippingForm()}
      {activeStep === 3 && renderPaymentForm()}
      {activeStep === 4 && renderOrderConfirmation()}
    </div>
  );
}
