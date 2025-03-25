'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  discount?: number;
  isHot?: boolean;
}

export default function Shop() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const products: Product[] = [
    // Solar Panels
    {
      id: 'sp1',
      name: 'Jinko Solar 580W Monocrystalline Panel',
      price: 29000,
      originalPrice: 32000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
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
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Panels',
      description: 'Premium quality monocrystalline panel for maximum energy yield',
      discount: 5
    },
    {
      id: 'sp3',
      name: 'Africell 350W Mono Panel',
      price: 17500,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Solar Panels',
      description: 'Cost-effective monocrystalline panel for residential use'
    },
    {
      id: 'sp4',
      name: 'Jinko Solar 620W Mono Panel',
      price: 31000,
      originalPrice: 33000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Solar Panels',
      description: 'High-power monocrystalline panel for commercial installations',
      discount: 6
    },
    {
      id: 'sp5',
      name: 'Felicity 450W Mono Half-Cell Panel',
      price: 22500,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Panels',
      description: 'Half-cell technology for better shading performance'
    },
    {
      id: 'sp6',
      name: 'JA 600W Bifacial Solar Panel',
      price: 32000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Panels',
      description: 'High-efficiency bifacial solar panel for maximum yield'
    },
    {
      id: 'sp7',
      name: 'Dayliff 200W Monocrystalline Solar',
      price: 12000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Solar Panels',
      description: '43.5V monocrystalline panel for small installations'
    },
    {
      id: 'sp8',
      name: 'ECOFLOW 400W Portable Solar Panel',
      price: 45000,
      originalPrice: 48000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Solar Panels',
      description: 'Portable and foldable solar panel with carrying case',
      discount: 6
    },
    {
      id: 'sp9',
      name: 'ECOFLOW 220W Portable Panel',
      price: 28000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Panels',
      description: 'Compact portable solar panel for mobile power'
    },
    {
      id: 'sp10',
      name: 'Longi 350W Monocrystalline Module',
      price: 18000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Solar Panels',
      description: '40.4V efficient monocrystalline solar module'
    },
    // Additional Solar Panels
    {
      id: 'sp11',
      name: 'YINGLI 545W Mono Module',
      price: 27500,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Panels',
      description: 'High-power monocrystalline solar module'
    },
    {
      id: 'sp12',
      name: 'Trinna 660W Mono Panel',
      price: 33000,
      originalPrice: 35000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Solar Panels',
      description: '45.7V high-efficiency mono panel',
      discount: 6
    },
    {
      id: 'sp13',
      name: 'ECOFLOW 160W Portable Panel',
      price: 22000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Solar Panels',
      description: 'Compact foldable solar panel'
    },
    {
      id: 'sp14',
      name: 'ECOFLOW 110W Portable Panel',
      price: 18000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Panels',
      description: 'Ultra-portable solar panel for camping'
    },
    {
      id: 'sp15',
      name: 'ECOFLOW 100W Flexible Panel',
      price: 25000,
      originalPrice: 28000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Solar Panels',
      description: 'Flexible solar panel for curved surfaces',
      discount: 11
    },
    // Final Solar Panels
    {
      id: 'sp16',
      name: 'ECOFLOW 60W Portable Panel',
      price: 12000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Panels',
      description: 'Ultra-light portable solar panel'
    },
    {
      id: 'sp17',
      name: 'ECOFLOW 45W Solar Panel',
      price: 9500,
      originalPrice: 11000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Solar Panels',
      description: 'Compact solar panel for mobile devices',
      discount: 14
    },
    // Inverters
    {
      id: 'inv1',
      name: 'Growatt 5KW Hybrid Solar Inverter',
      price: 125000,
      originalPrice: 135000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Inverters',
      description: '48V 80A SPF 5000ES Single Phase Hybrid Inverter',
      discount: 7,
      isHot: true
    },
    {
      id: 'inv2',
      name: 'Must 3KVA Hybrid Inverter',
      price: 85000,
      originalPrice: 95000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Inverters',
      description: '24V 60A 145VDC Hybrid Off-grid Inverter',
      discount: 11
    },
    {
      id: 'inv3',
      name: 'Deye 12KW Three Phase Hybrid Inverter',
      price: 280000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Inverters',
      description: 'SUN-12K-SG04LP3-EU Three Phase 48V Hybrid Inverter'
    },
    {
      id: 'inv4',
      name: 'Fronius Tauro 50KW Three Phase',
      price: 850000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Inverters',
      description: 'Commercial grade grid-tied inverter with monitoring',
      isHot: true
    },
    {
      id: 'inv5',
      name: 'Growatt SPF 3000TL HVM-24',
      price: 95000,
      originalPrice: 105000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Inverters',
      description: '3KW Hybrid inverter with parallel capability',
      discount: 10
    },
    {
      id: 'inv6',
      name: 'Victron MultiPlus-II 48/5000',
      price: 320000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Inverters',
      description: '48V 5000VA inverter/charger with parallel function'
    },
    {
      id: 'inv7',
      name: 'SMA Sunny Boy 5.0',
      price: 180000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Inverters',
      description: '5kW grid-tie inverter with smart features'
    },
    // Additional Inverters
    {
      id: 'inv8',
      name: 'Growatt MIN 3000TL-X',
      price: 85000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Inverters',
      description: '3kW grid-tie inverter with monitoring'
    },
    {
      id: 'inv9',
      name: 'Deye 5KW Hybrid Inverter',
      price: 180000,
      originalPrice: 195000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Inverters',
      description: '48V 5KW hybrid inverter with parallel',
      discount: 8
    },
    {
      id: 'inv10',
      name: 'Solis 10K 5G Three Phase',
      price: 250000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Inverters',
      description: '10kW three-phase grid-tie inverter'
    },
    // Final Inverters
    {
      id: 'inv11',
      name: 'Growatt SPH 6000TL BL-UP',
      price: 220000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Inverters',
      description: '6kW hybrid inverter with UPS function'
    },
    {
      id: 'inv12',
      name: 'Solis 25K 5G Three Phase',
      price: 450000,
      originalPrice: 480000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Inverters',
      description: '25kW commercial grid-tie inverter',
      discount: 6
    },
    // Batteries
    {
      id: 'bat1',
      name: 'Megatank 5KWh Lithium Battery',
      price: 250000,
      originalPrice: 280000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Batteries',
      description: '51.2V 100Ah Lithium Battery with BMS',
      discount: 11,
      isHot: true
    },
    {
      id: 'bat2',
      name: 'Eastman 200Ah Gel Solar Battery',
      price: 45000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Batteries',
      description: 'Maintenance-free deep cycle gel battery'
    },
    {
      id: 'bat3',
      name: 'BYD 5KWh Lithium Battery',
      price: 280000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Batteries',
      description: 'LV Flex Lite 5.0 with built-in BMS'
    },
    {
      id: 'bat4',
      name: 'Weco 5.3KWh Lithium Battery',
      price: 275000,
      originalPrice: 290000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Batteries',
      description: '48V LFP Battery with 7000 cycles',
      discount: 5
    },
    {
      id: 'bat5',
      name: 'Freedom Won 10kWh Lite',
      price: 450000,
      originalPrice: 480000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Batteries',
      description: 'High-capacity lithium battery with 10-year warranty',
      discount: 6
    },
    {
      id: 'bat6',
      name: 'Pylontech US3000C',
      price: 320000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Batteries',
      description: '3.5kWh modular lithium battery system'
    },
    {
      id: 'bat7',
      name: 'Dyness PowerBox F 5.1kWh',
      price: 285000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Batteries',
      description: 'Wall-mounted lithium battery with smart BMS'
    },
    // Additional Batteries
    {
      id: 'bat8',
      name: 'Felicity 5.12kWh LiFePO4',
      price: 265000,
      originalPrice: 280000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Batteries',
      description: '48V lithium iron phosphate battery',
      discount: 5
    },
    {
      id: 'bat9',
      name: 'Growatt ARK 2.5H-A1',
      price: 180000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Batteries',
      description: '2.5kWh low-voltage battery module'
    },
    {
      id: 'bat10',
      name: 'Sunverter 100Ah Gel Battery',
      price: 32000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Batteries',
      description: 'Deep cycle gel battery for solar'
    },
    // Final Batteries
    {
      id: 'bat11',
      name: 'Dyness B4850',
      price: 220000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Batteries',
      description: '4.8kWh lithium battery system'
    },
    {
      id: 'bat12',
      name: 'Felicity 2.4kWh LiFePO4',
      price: 145000,
      originalPrice: 155000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Batteries',
      description: 'Compact lithium battery for homes',
      discount: 6
    },
    // Solar Water Heaters
    {
      id: 'swh1',
      name: 'Seven Stars 200L Heat-Pipe System',
      price: 125000,
      originalPrice: 135000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Water Heaters',
      description: 'Pressurized heat-pipe tube stainless steel solar water heater',
      discount: 7
    },
    {
      id: 'swh2',
      name: 'Eraslan 300L Pressurized System',
      price: 165000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Water Heaters',
      description: 'Flat plate indirect pressurized solar water heater'
    },
    {
      id: 'swh3',
      name: 'Megasun 200L Direct System',
      price: 98000,
      originalPrice: 110000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Water Heaters',
      description: 'Direct flat plate pressurized solar water heating system',
      discount: 11
    },
    {
      id: 'swh4',
      name: 'Sunrain 300L Split System',
      price: 180000,
      originalPrice: 195000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Water Heaters',
      description: 'Split pressurized solar water heater system',
      discount: 8
    },
    {
      id: 'swh5',
      name: 'Apricus 200L Evacuated Tube',
      price: 145000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Water Heaters',
      description: 'High-efficiency evacuated tube collector system'
    },
    // Additional Water Heaters
    {
      id: 'swh6',
      name: 'Megasun 150L Direct System',
      price: 85000,
      originalPrice: 92000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Water Heaters',
      description: 'Compact direct system for small homes',
      discount: 8
    },
    {
      id: 'swh7',
      name: 'Eraslan 500L Industrial',
      price: 280000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Water Heaters',
      description: 'Large-scale industrial water heating'
    },
    // Final Water Heaters
    {
      id: 'swh8',
      name: 'Seven Stars 150L Heat-Pipe',
      price: 95000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Water Heaters',
      description: 'Compact heat-pipe water heater'
    },
    {
      id: 'swh9',
      name: 'Megasun 300L Commercial',
      price: 185000,
      originalPrice: 195000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Water Heaters',
      description: 'Commercial pressurized system',
      discount: 5
    },
    // Solar Lighting
    {
      id: 'sl1',
      name: 'Modi 300W Solar Flood Light',
      price: 18500,
      originalPrice: 22000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Solar Lighting',
      description: 'High-power LED flood light with remote control',
      discount: 16
    },
    {
      id: 'sl2',
      name: 'AllTop 3000W Street Light',
      price: 45000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Solar Lighting',
      description: 'Motion sensor solar street light with high luminosity',
      isHot: true
    },
    {
      id: 'sl3',
      name: 'Modi 100W LED Flood Light',
      price: 12500,
      originalPrice: 15000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Lighting',
      description: 'MD-PT77 Series outdoor solar flood light',
      discount: 17
    },
    {
      id: 'sl4',
      name: 'AllTop 200W Street Light',
      price: 28000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Solar Lighting',
      description: 'All-in-one solar street light with motion sensor'
    },
    {
      id: 'sl5',
      name: 'Modi 150W Flood Light',
      price: 15000,
      originalPrice: 17000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Solar Lighting',
      description: 'High-brightness LED flood light with remote',
      discount: 12
    },
    // Additional Solar Lighting
    {
      id: 'sl6',
      name: 'Modi 80W Street Light',
      price: 12000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Solar Lighting',
      description: 'All-in-one street light with sensor'
    },
    {
      id: 'sl7',
      name: 'AllTop 100W Flood Light',
      price: 14500,
      originalPrice: 16000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Lighting',
      description: 'High-power LED flood light',
      discount: 9
    },
    // Final Solar Lighting
    {
      id: 'sl8',
      name: 'Modi 500W Stadium Light',
      price: 45000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Solar Lighting',
      description: 'High-power stadium flood light'
    },
    {
      id: 'sl9',
      name: 'AllTop 30W Garden Light',
      price: 8500,
      originalPrice: 9500,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Solar Lighting',
      description: 'Decorative garden solar light',
      discount: 11
    },
    // Charge Controllers
    {
      id: 'cc1',
      name: 'Victron SmartSolar MPPT 150/100',
      price: 85000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Charge Controllers',
      description: 'TR Charge Controller with Bluetooth connectivity'
    },
    {
      id: 'cc2',
      name: 'Victron MPPT 250/100',
      price: 98000,
      originalPrice: 105000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Charge Controllers',
      description: 'High-voltage MPPT solar charge controller',
      discount: 7
    },
    {
      id: 'cc3',
      name: 'Huawei LUNA Power Module',
      price: 75000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Charge Controllers',
      description: 'Smart power module controller for optimal charging'
    },
    {
      id: 'cc4',
      name: 'Victron MPPT 150/85-Tr',
      price: 65000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Charge Controllers',
      description: '85A MPPT solar charge controller'
    },
    {
      id: 'cc5',
      name: 'Victron MPPT 100/50',
      price: 45000,
      originalPrice: 48000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Charge Controllers',
      description: '50A MPPT controller with Bluetooth',
      discount: 6
    },
    // Additional Charge Controllers
    {
      id: 'cc6',
      name: 'Victron MPPT 75/15',
      price: 22000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Charge Controllers',
      description: '15A MPPT charge controller'
    },
    {
      id: 'cc7',
      name: 'Must Solar PC18-8015F',
      price: 18000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Charge Controllers',
      description: '80A PWM charge controller'
    },
    // Final Charge Controllers
    {
      id: 'cc8',
      name: 'Victron MPPT 150/60',
      price: 55000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Charge Controllers',
      description: '60A MPPT solar controller'
    },
    {
      id: 'cc9',
      name: 'Must Solar PC16-6015F',
      price: 15000,
      originalPrice: 16500,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Charge Controllers',
      description: '60A PWM charge controller',
      discount: 9
    },
    // Mounting Systems
    {
      id: 'ms1',
      name: 'Complete Roof Mounting Kit',
      price: 35000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Mounting Systems',
      description: 'Includes rails, clamps, and hardware for 4kW system'
    },
    {
      id: 'ms2',
      name: 'Ground Mount Structure Kit',
      price: 48000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Mounting Systems',
      description: 'Complete ground mounting solution for solar panels'
    },
    {
      id: 'ms3',
      name: 'Tile Roof Mounting Kit',
      price: 42000,
      originalPrice: 45000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Mounting Systems',
      description: 'Specialized mounting system for tile roofs',
      discount: 7
    },
    {
      id: 'ms4',
      name: 'Aluminum Rail 4200mm Kit',
      price: 8500,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Mounting Systems',
      description: 'Solar panel mounting rails with accessories'
    },
    {
      id: 'ms5',
      name: 'Mid Clamp 35mm Kit',
      price: 2500,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Mounting Systems',
      description: 'Solar panel mid clamps for secure mounting'
    },
    // Additional Mounting Systems
    {
      id: 'ms6',
      name: 'End Clamp 40mm Kit',
      price: 2800,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Mounting Systems',
      description: 'Solar panel end clamps with bolts'
    },
    {
      id: 'ms7',
      name: 'Rail Splice Kit',
      price: 1200,
      originalPrice: 1500,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Mounting Systems',
      description: 'Rail connectors with SS bolts',
      discount: 20
    },
    // Final Mounting Systems
    {
      id: 'ms8',
      name: 'L-Foot Mounting Kit',
      price: 3500,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Mounting Systems',
      description: 'L-foot roof mounting set'
    },
    {
      id: 'ms9',
      name: 'Triangle Support Kit',
      price: 4500,
      originalPrice: 5000,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Mounting Systems',
      description: 'Adjustable triangle supports',
      discount: 10
    },
    // Accessories
    {
      id: 'acc1',
      name: 'MC4 Connector Set',
      price: 350,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Accessories',
      description: 'High-quality MC4 solar cable connectors'
    },
    {
      id: 'acc2',
      name: 'Solar DC Cable 6mm²',
      price: 8500,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Accessories',
      description: '100m roll, UV resistant PV cable'
    },
    {
      id: 'acc3',
      name: '12-Way PV Combiner Box',
      price: 12500,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Accessories',
      description: 'IP65 rated enclosure for solar array connections'
    },
    {
      id: 'acc4',
      name: 'Suntree DC Circuit Breaker',
      price: 4500,
      originalPrice: 5000,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Accessories',
      description: '1000V/32A 4-Pole DC circuit breaker',
      discount: 10
    },
    {
      id: 'acc5',
      name: 'Battery Cable 35mm²',
      price: 12500,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Accessories',
      description: '100m welding cable for battery connections'
    },
    {
      id: 'acc6',
      name: 'Automatic Changeover Switch',
      price: 8500,
      originalPrice: 9500,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Accessories',
      description: '63A 2-Pole single phase ATS',
      discount: 11
    },
    {
      id: 'acc7',
      name: 'Solar Mounting Tile Hook',
      price: 1500,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Accessories',
      description: 'Stainless steel tile roof mounting hooks'
    },
    // Additional Accessories
    {
      id: 'acc8',
      name: 'PV Combiner Box 8-Way',
      price: 8500,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Accessories',
      description: '8-way solar array combiner box'
    },
    {
      id: 'acc9',
      name: 'Solar DC Cable 10mm²',
      price: 12000,
      originalPrice: 13500,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Accessories',
      description: '100m UV resistant solar cable',
      discount: 11
    },
    {
      id: 'acc10',
      name: 'MC4 Y-Branch Connectors',
      price: 850,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Accessories',
      description: 'MC4 parallel connection set'
    },
    // Final Accessories
    {
      id: 'acc11',
      name: 'PV Disconnect Switch',
      price: 4500,
      image: '/african-american-technician-checks-maintenance-solar-panels-group-three-black-engineers-meeting-solar-station.jpg',
      category: 'Accessories',
      description: '1000V DC isolator switch'
    },
    {
      id: 'acc12',
      name: 'Lightning Arrestor Kit',
      price: 3500,
      originalPrice: 4000,
      image: '/photovoltaics-solar-power-station-energy-from-natural.jpg',
      category: 'Accessories',
      description: 'Solar PV lightning protection',
      discount: 12
    },
    {
      id: 'acc13',
      name: 'Earthing Cable Kit',
      price: 2500,
      image: '/beautiful-alternative-energy-plant-with-solar-panels.jpg',
      category: 'Accessories',
      description: 'Complete earthing cable set'
    }
  ];

  const categories = [...new Set(products.map(product => product.category))];

  // Return all products since we're not filtering
  const filteredProducts = products;

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <Image 
            src="/solar-panels-roof-solar-cell.jpg"
            alt="Solar Shop Banner"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Solar Products Shop
          </h1>
          <p className="text-xl text-white">
            High-quality solar equipment at competitive prices
          </p>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-end">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
              <span>Cart</span>
              <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        {categories.map((category) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts
                .filter((product) => product.category === category)
                .map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.isHot && (
                        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          HOT
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xl font-bold text-blue-600">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        {product.discount && (
                          <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Energy Solutions Banner */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Need Something Special?</h2>
          <Link 
            href="/contact-us"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Contact Us For Custom Solutions
          </Link>
        </div>
      </section>
    </div>
  );
}
