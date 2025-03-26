export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  discount?: number;
  isHot?: boolean;
  quantity?: number;
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

// Get all unique categories from products
export const categories = [...new Set(products.map(product => product.category))];

// Format price to KSh format
export const formatPrice = (price: number) => {
  return `KSh ${price.toLocaleString()}`;
};
