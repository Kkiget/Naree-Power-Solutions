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
}

export const products: Product[] = [
  // Solar Panels
  {
    id: 'sp1',
    name: 'JA 600W Bifacial Solar Panel',
    price: 45000,
    image: '/solar-panels-roof-solar-cell.jpg',
    category: 'Solar Panels',
    description: 'High-efficiency bifacial solar panel'
  },
  // ... rest of the products array
];
