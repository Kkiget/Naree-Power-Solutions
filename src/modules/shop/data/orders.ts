export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentDetails {
  method: 'credit_card' | 'mpesa' | 'bank_transfer' | 'cash_on_delivery';
  transactionId?: string;
  last4?: string;
  paymentDate: string;
}

export interface OrderTracking {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  statusDate: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  trackingHistory: {
    status: string;
    date: string;
    location?: string;
    notes?: string;
  }[];
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  date: string;
  shipping: ShippingDetails;
  payment: PaymentDetails;
  tracking: OrderTracking;
}

// Sample user orders data
export const sampleOrders: Order[] = [
  {
    id: 'ORD-123456',
    userId: 'user-1',
    items: [
      {
        id: 'item-1',
        productId: 'sp1',
        productName: 'Solar Panel 100W',
        quantity: 2,
        price: 12000,
        image: '/images/solar-panel.jpg'
      },
      {
        id: 'item-2',
        productId: 'inv1',
        productName: 'Solar Inverter 1000W',
        quantity: 1,
        price: 15000,
        image: '/images/solar-inverter.jpg'
      }
    ],
    total: 39000,
    date: '2025-03-01',
    shipping: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+254712345678',
      address: '123 Main St',
      city: 'Nairobi',
      postalCode: '00100',
      country: 'Kenya'
    },
    payment: {
      method: 'mpesa',
      transactionId: 'MPESA123456',
      paymentDate: '2025-03-01'
    },
    tracking: {
      status: 'delivered',
      statusDate: '2025-03-10',
      trackingNumber: 'TRK-123456',
      carrier: 'Swift Delivery',
      estimatedDelivery: '2025-03-08',
      trackingHistory: [
        {
          status: 'Order Placed',
          date: '2025-03-01',
          notes: 'Your order has been received and is being processed'
        },
        {
          status: 'Processing',
          date: '2025-03-02',
          notes: 'Your order is being prepared for shipping'
        },
        {
          status: 'Shipped',
          date: '2025-03-03',
          location: 'Nairobi Distribution Center',
          notes: 'Your order has been shipped'
        },
        {
          status: 'In Transit',
          date: '2025-03-05',
          location: 'Nairobi Sorting Facility',
          notes: 'Your order is on its way'
        },
        {
          status: 'Out for Delivery',
          date: '2025-03-10',
          location: 'Local Delivery Vehicle',
          notes: 'Your order is out for delivery'
        },
        {
          status: 'Delivered',
          date: '2025-03-10',
          location: 'Recipient Address',
          notes: 'Your order has been delivered'
        }
      ]
    }
  },
  {
    id: 'ORD-123457',
    userId: 'user-1',
    items: [
      {
        id: 'item-3',
        productId: 'bat1',
        productName: 'Solar Battery 12V',
        quantity: 1,
        price: 8000,
        image: '/images/solar-battery.jpg'
      }
    ],
    total: 8000,
    date: '2025-03-15',
    shipping: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+254712345678',
      address: '123 Main St',
      city: 'Nairobi',
      postalCode: '00100',
      country: 'Kenya'
    },
    payment: {
      method: 'credit_card',
      last4: '4242',
      paymentDate: '2025-03-15'
    },
    tracking: {
      status: 'shipped',
      statusDate: '2025-03-18',
      trackingNumber: 'TRK-123457',
      carrier: 'Swift Delivery',
      estimatedDelivery: '2025-03-22',
      trackingHistory: [
        {
          status: 'Order Placed',
          date: '2025-03-15',
          notes: 'Your order has been received and is being processed'
        },
        {
          status: 'Processing',
          date: '2025-03-16',
          notes: 'Your order is being prepared for shipping'
        },
        {
          status: 'Shipped',
          date: '2025-03-18',
          location: 'Nairobi Distribution Center',
          notes: 'Your order has been shipped'
        }
      ]
    }
  },
  {
    id: 'ORD-123458',
    userId: 'user-1',
    items: [
      {
        id: 'item-4',
        productId: 'cc1',
        productName: 'Charge Controller 30A',
        quantity: 1,
        price: 5000,
        image: '/images/charge-controller.jpg'
      }
    ],
    total: 5000,
    date: '2025-03-20',
    shipping: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+254712345678',
      address: '123 Main St',
      city: 'Nairobi',
      postalCode: '00100',
      country: 'Kenya'
    },
    payment: {
      method: 'mpesa',
      transactionId: 'MPESA123458',
      paymentDate: '2025-03-20'
    },
    tracking: {
      status: 'processing',
      statusDate: '2025-03-21',
      estimatedDelivery: '2025-03-25',
      trackingHistory: [
        {
          status: 'Order Placed',
          date: '2025-03-20',
          notes: 'Your order has been received and is being processed'
        },
        {
          status: 'Processing',
          date: '2025-03-21',
          notes: 'Your order is being prepared for shipping'
        }
      ]
    }
  }
];
