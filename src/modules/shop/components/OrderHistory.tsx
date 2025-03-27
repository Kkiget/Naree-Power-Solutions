'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaAngleRight, FaSearch, FaDownload } from 'react-icons/fa';
import { formatPrice } from '../data/utils';
import { Order, sampleOrders } from '../data/orders';

export default function OrderHistory() {
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'tracking' | 'items'>('summary');
  const [trackingNumberSearch, setTrackingNumberSearch] = useState('');
  
  // Filter orders for the search functionality
  const filteredOrders = trackingNumberSearch 
    ? sampleOrders.filter(order => 
        order.id.toLowerCase().includes(trackingNumberSearch.toLowerCase()) ||
        (order.tracking.trackingNumber && 
         order.tracking.trackingNumber.toLowerCase().includes(trackingNumberSearch.toLowerCase()))
      )
    : sampleOrders;
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return '⏳';
      case 'processing': return '⚙️';
      case 'shipped': return <FaTruck />;
      case 'delivered': return <FaCheckCircle />;
      case 'cancelled': return <FaTimesCircle />;
      default: return <FaBox />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Track package form
  const renderTrackingSearch = () => (
    <div className="mb-8 p-6 rounded-lg bg-orange-50 border border-orange-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Track Your Order</h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter Order ID or Tracking Number"
            value={trackingNumberSearch}
            onChange={(e) => setTrackingNumberSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <button className="bg-orange-600 text-white py-3 px-6 rounded hover:bg-orange-700 transition-colors flex items-center justify-center sm:whitespace-nowrap">
          <FaSearch className="mr-2" />
          Track Order
        </button>
      </div>
    </div>
  );
  
  // Order list
  const renderOrderList = () => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h2>
      
      {filteredOrders.length === 0 ? (
        <div className="text-center p-8 border border-gray-200 rounded-lg">
          <p className="text-gray-500 mb-4">No orders found matching your search criteria.</p>
          {trackingNumberSearch && (
            <button 
              onClick={() => setTrackingNumberSearch('')}
              className="text-orange-600 hover:text-orange-700"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {filteredOrders.map((order, index) => (
            <div 
              key={order.id}
              className={`p-4 ${index !== filteredOrders.length - 1 ? 'border-b border-gray-200' : ''} hover:bg-gray-50 cursor-pointer`}
              onClick={() => setViewingOrder(order)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{order.id}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusColor(order.tracking.status)}`}>
                      <span className="mr-1">{getStatusIcon(order.tracking.status)}</span>
                      {order.tracking.status.charAt(0).toUpperCase() + order.tracking.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>Order Date: {formatDate(order.date)}</p>
                    <p>Total: {formatPrice(order.total)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </span>
                  <FaAngleRight className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  // Order detail view
  const renderOrderDetail = () => {
    if (!viewingOrder) return null;
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h3 className="font-semibold text-gray-800">{viewingOrder.id}</h3>
            <p className="text-sm text-gray-500">Ordered on {formatDate(viewingOrder.date)}</p>
          </div>
          <button 
            onClick={() => setViewingOrder(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {['summary', 'tracking', 'items'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === tab 
                    ? 'text-orange-600 border-b-2 border-orange-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab as 'summary' | 'tracking' | 'items')}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'summary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Shipping Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <p className="font-medium">{viewingOrder.shipping.fullName}</p>
                  <p>{viewingOrder.shipping.address}</p>
                  <p>{viewingOrder.shipping.city}, {viewingOrder.shipping.postalCode}</p>
                  <p>{viewingOrder.shipping.country}</p>
                  <p className="mt-2">{viewingOrder.shipping.phone}</p>
                  <p>{viewingOrder.shipping.email}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Payment Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <p><span className="font-medium">Method:</span> {viewingOrder.payment.method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                  {viewingOrder.payment.transactionId && (
                    <p><span className="font-medium">Transaction ID:</span> {viewingOrder.payment.transactionId}</p>
                  )}
                  {viewingOrder.payment.last4 && (
                    <p><span className="font-medium">Card ending in:</span> **** **** **** {viewingOrder.payment.last4}</p>
                  )}
                  <p><span className="font-medium">Date:</span> {formatDate(viewingOrder.payment.paymentDate)}</p>
                  <p className="mt-4"><span className="font-medium">Total:</span> {formatPrice(viewingOrder.total)}</p>
                </div>
                
                <div className="mt-6">
                  <button className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors flex items-center mr-2">
                    <FaDownload className="mr-2" />
                    Invoice
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tracking' && (
            <div>
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-sm px-2 py-1 rounded-full flex items-center ${getStatusColor(viewingOrder.tracking.status)}`}>
                        <span className="mr-1">{getStatusIcon(viewingOrder.tracking.status)}</span>
                        {viewingOrder.tracking.status.charAt(0).toUpperCase() + viewingOrder.tracking.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(viewingOrder.tracking.statusDate)}
                      </span>
                    </div>
                  </div>
                  
                  {viewingOrder.tracking.estimatedDelivery && (
                    <div>
                      <p className="text-sm text-gray-600">Estimated Delivery</p>
                      <p className="font-medium">{formatDate(viewingOrder.tracking.estimatedDelivery)}</p>
                    </div>
                  )}
                  
                  {viewingOrder.tracking.trackingNumber && (
                    <div>
                      <p className="text-sm text-gray-600">Tracking Number</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{viewingOrder.tracking.trackingNumber}</p>
                        {viewingOrder.tracking.carrier && (
                          <span className="text-sm text-gray-500">
                            ({viewingOrder.tracking.carrier})
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tracking Timeline */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4 text-gray-800">Tracking History</h4>
                
                <div className="relative pl-8 before:absolute before:left-3 before:top-3 before:bottom-0 before:w-0.5 before:bg-orange-200">
                  {viewingOrder.tracking.trackingHistory.map((event, index) => (
                    <div key={index} className={`mb-6 ${index === 0 ? 'opacity-100' : 'opacity-80'}`}>
                      <div className="absolute left-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                        {event.location && (
                          <p className="text-sm text-gray-600">{event.location}</p>
                        )}
                        {event.notes && (
                          <p className="text-sm text-gray-600 mt-1">{event.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'items' && (
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Items in this Order</h4>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {viewingOrder.items.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`p-4 ${index !== viewingOrder.items.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0 w-16 h-16 bg-gray-50 rounded">
                        <Image 
                          src={item.image}
                          alt={item.productName}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <h5 className="font-medium text-gray-800">{item.productName}</h5>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} x {formatPrice(item.price)}
                          </p>
                          <p className="font-semibold text-orange-600">
                            {formatPrice(item.quantity * item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-bold text-orange-600">{formatPrice(viewingOrder.total)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <button className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors flex items-center">
                  Buy Again
                </button>
                <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors">
                  Return Items
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      {renderTrackingSearch()}
      
      {viewingOrder ? (
        <>
          <button 
            onClick={() => setViewingOrder(null)}
            className="mb-4 flex items-center text-orange-600 hover:text-orange-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Orders
          </button>
          {renderOrderDetail()}
        </>
      ) : (
        renderOrderList()
      )}
    </div>
  );
}
