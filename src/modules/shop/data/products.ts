export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  quantity?: number;
  discount?: number;
  isHot?: boolean;
  isNew?: boolean; // Flag for new products
  // Adding additional properties for enhanced product details
  rating?: number;
  reviews?: number;
  brand?: string;
  model?: string;
  warranty?: string;
  relatedProducts?: string[]; // IDs of related products
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockCount?: number;
  dateAdded?: string; // Date when the product was added to the catalog
  oldPrice?: number; // For displaying strikethrough prices
}

export const products: Product[] = [
  // Solar Panels
  {
    id: 'sp1',
    name: 'Jinko Solar 580W Monocrystalline Panel',
    price: 29000,
    originalPrice: 32000,
    image: '/images/beautiful-alternative-energy-plant-with-solar-panels.jpg',
    category: 'Solar Panels',
    description: 'High-efficiency monocrystalline solar panel with 25-year warranty',
    discount: 9,
    isHot: true
  },
  {
    id: 'sp2',
    name: 'JA Solar 565W Mono Panel',
    price: 28500,
    originalPrice: 30000,
    image: '/images/photovoltaics-solar-power-station-energy-from-natural.jpg',
    category: 'Solar Panels',
    description: 'Premium quality monocrystalline panel for maximum energy yield',
    discount: 5
  },
  {
    id: 'sp3',
    name: 'Africell 350W Mono Panel',
    price: 17500,
    image: '/images/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
    category: 'Solar Panels',
    description: 'Cost-effective monocrystalline panel for residential use'
  },
  // Inverters
  {
    id: 'inv1',
    name: 'Growatt 5kW Hybrid Inverter',
    price: 85000,
    originalPrice: 95000,
    image: '/images/beautiful-alternative-energy-plant-with-solar-panels.jpg',
    category: 'Inverters',
    description: 'SPF 5000ES single-phase hybrid inverter',
    discount: 11,
    isHot: true
  },
  {
    id: 'inv2',
    name: 'Deye 8kW 3-Phase Inverter',
    price: 120000,
    image: '/images/photovoltaics-solar-power-station-energy-from-natural.jpg',
    category: 'Inverters',
    description: 'SUN-8K-SG03LP1 3-phase string inverter'
  },
  {
    id: 'inv3',
    name: 'Solis 3.6kW Grid-Tie Inverter',
    price: 45000,
    originalPrice: 48000,
    image: '/images/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
    category: 'Inverters',
    description: 'Mini 4G single-phase grid-tie inverter',
    discount: 6
  },
  // Batteries
  {
    id: 'bat1',
    name: 'Pylontech 3.5kWh Lithium Battery',
    price: 110000,
    image: '/images/beautiful-alternative-energy-plant-with-solar-panels.jpg',
    category: 'Batteries',
    description: 'US3000C 48V lithium battery with 10-year warranty',
    isHot: true
  },
  {
    id: 'bat2',
    name: 'Freedom 200Ah Deep Cycle Battery',
    price: 35000,
    originalPrice: 40000,
    image: '/images/photovoltaics-solar-power-station-energy-from-natural.jpg',
    category: 'Batteries',
    description: 'Maintenance-free gel battery for solar storage',
    discount: 12
  },
  {
    id: 'bat3',
    name: 'Felicity 100Ah Lithium Battery',
    price: 65000,
    image: '/images/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
    category: 'Batteries',
    description: '12V LiFePO4 battery with BMS'
  },
];

// Sample product review data
export const productReviews: Record<string, Review[]> = {
  'sp1': [
    {
      id: 'review-1',
      productId: 'sp1',
      userName: 'John M.',
      rating: 5,
      date: '2025-02-15',
      title: 'Excellent performance in Kenyan climate',
      comment: 'I installed these panels on my roof in Nairobi. They have been performing exceptionally well even during the rainy season. The power output is consistent with what was advertised.',
      helpful: 12,
      verified: true
    },
    {
      id: 'review-2',
      productId: 'sp1',
      userName: 'Sarah K.',
      rating: 4,
      date: '2025-01-30',
      title: 'Good quality, professional installation',
      comment: 'The panels are working well for my home. Naree team was professional during installation. Only giving 4 stars because the initial cost estimation was a bit off.',
      helpful: 8,
      verified: true
    },
    {
      id: 'review-3',
      productId: 'sp1',
      userName: 'David O.',
      rating: 5,
      date: '2025-01-10',
      title: 'Best investment for my business',
      comment: 'We installed these panels for our small hotel in Mombasa. The energy savings have been substantial, and the panels have withstood the coastal climate well. Highly recommended.',
      helpful: 15,
      verified: true
    }
  ],
  'inv1': [
    {
      id: 'review-4',
      productId: 'inv1',
      userName: 'Michael W.',
      rating: 5,
      date: '2025-02-20',
      title: 'Efficient and reliable',
      comment: 'This inverter has been handling my home solar system perfectly. The efficiency is remarkable, and I haven\'t had any issues with power conversion or storage.',
      helpful: 7,
      verified: true
    },
    {
      id: 'review-5',
      productId: 'inv1',
      userName: 'Elizabeth J.',
      rating: 3,
      date: '2025-01-05',
      title: 'Works but noisy',
      comment: 'The inverter functions as expected, but it produces more noise than I anticipated. Otherwise, the performance is good.',
      helpful: 4,
      verified: true
    }
  ],
  'bat1': [
    {
      id: 'review-6',
      productId: 'bat1',
      userName: 'Robert N.',
      rating: 5,
      date: '2025-03-10',
      title: 'Excellent storage capacity',
      comment: 'These batteries have allowed me to store enough energy to power my home through the night. The capacity is as promised, and they seem to be very durable.',
      helpful: 9,
      verified: true
    }
  ]
};
