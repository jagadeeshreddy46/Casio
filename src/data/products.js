export const products = [
  {
    id: '1',
    name: 'Modern Sectional Sofa',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'sofas',
    color: 'gray',
    description: 'Luxurious modern sectional sofa with premium fabric upholstery and comfortable cushioning. Perfect for contemporary living spaces with its sleek design and exceptional comfort.',
    specifications: {
      material: 'Premium fabric with solid wood frame',
      dimensions: '102" W x 65" D x 32" H',
      weight: '180 lbs',
      warranty: '5 years'
    },
    inStock: true,
    featured: true,
    bestseller: true
  },
  {
    id: '2',
    name: 'Oak Dining Table',
    price: 899,
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tables',
    color: 'brown',
    description: 'Handcrafted solid oak dining table with natural wood grain finish. Seats up to 6 people comfortably. Perfect centerpiece for family gatherings.',
    specifications: {
      material: 'Solid oak wood',
      dimensions: '72" L x 36" W x 30" H',
      weight: '120 lbs',
      warranty: '10 years'
    },
    inStock: true,
    featured: true,
    bestseller: false
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    price: 399,
    originalPrice: 499,
    image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4050301/pexels-photo-4050301.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'chairs',
    color: 'black',
    description: 'Premium ergonomic office chair with lumbar support and adjustable height. Designed for maximum comfort during long work sessions.',
    specifications: {
      material: 'Mesh back with leather seat',
      dimensions: '26" W x 26" D x 40-44" H',
      weight: '45 lbs',
      warranty: '3 years'
    },
    inStock: true,
    featured: false,
    bestseller: true
  },
  {
    id: '4',
    name: 'Industrial Bookshelf',
    price: 549,
    image: 'https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'storage',
    color: 'brown',
    description: 'Industrial-style bookshelf with metal frame and reclaimed wood shelves. Perfect for modern and rustic interiors alike.',
    specifications: {
      material: 'Reclaimed wood and steel',
      dimensions: '32" W x 16" D x 72" H',
      weight: '85 lbs',
      warranty: '2 years'
    },
    inStock: true,
    featured: true,
    bestseller: false
  },
  {
    id: '5',
    name: 'Velvet Accent Chair',
    price: 649,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'chairs',
    color: 'blue',
    description: 'Luxurious velvet accent chair with gold-finished legs. Adds elegance and comfort to any room with its sophisticated design.',
    specifications: {
      material: 'Velvet upholstery with gold metal legs',
      dimensions: '30" W x 32" D x 34" H',
      weight: '55 lbs',
      warranty: '2 years'
    },
    inStock: true,
    featured: false,
    bestseller: true
  },
  {
    id: '6',
    name: 'Glass Coffee Table',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tables',
    color: 'clear',
    description: 'Modern tempered glass coffee table with chrome legs. Creates an airy, spacious feel in your living room.',
    specifications: {
      material: 'Tempered glass with chrome steel',
      dimensions: '48" L x 24" W x 18" H',
      weight: '60 lbs',
      warranty: '1 year'
    },
    inStock: true,
    featured: false,
    bestseller: false
  },
  {
    id: '7',
    name: 'Platform Bed Frame',
    price: 799,
    image: 'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'beds',
    color: 'brown',
    description: 'Minimalist platform bed frame with built-in nightstands. No box spring required. Clean lines and functional design.',
    specifications: {
      material: 'Solid wood construction',
      dimensions: 'Queen: 84" L x 64" W x 14" H',
      weight: '140 lbs',
      warranty: '5 years'
    },
    inStock: true,
    featured: true,
    bestseller: false
  },
  {
    id: '8',
    name: 'Storage Ottoman',
    price: 159,
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'storage',
    color: 'beige',
    description: 'Multi-functional storage ottoman that serves as seating, footrest, and storage solution. Perfect for small spaces.',
    specifications: {
      material: 'Fabric upholstery with wood frame',
      dimensions: '32" W x 18" D x 18" H',
      weight: '25 lbs',
      warranty: '1 year'
    },
    inStock: true,
    featured: false,
    bestseller: true
  },
  {
    id: '9',
    name: 'Leather Recliner',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.pexels.com/photos/1648772/pexels-photo-1648772.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1648772/pexels-photo-1648772.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'chairs',
    color: 'brown',
    description: 'Premium leather recliner with manual recline mechanism. Ultimate comfort for relaxation and entertainment.',
    specifications: {
      material: 'Genuine leather with steel frame',
      dimensions: '32" W x 36" D x 42" H',
      weight: '95 lbs',
      warranty: '5 years'
    },
    inStock: true,
    featured: true,
    bestseller: true
  },
  {
    id: '10',
    name: 'Minimalist Nightstand',
    price: 199,
    image: 'https://images.pexels.com/photos/1350788/pexels-photo-1350788.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1350788/pexels-photo-1350788.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'storage',
    color: 'white',
    description: 'Clean, minimalist nightstand with one drawer and open shelf. Perfect for modern bedroom aesthetics.',
    specifications: {
      material: 'Engineered wood with white finish',
      dimensions: '18" W x 16" D x 24" H',
      weight: '30 lbs',
      warranty: '2 years'
    },
    inStock: true,
    featured: false,
    bestseller: false
  },
  {
    id: '11',
    name: 'Executive Desk',
    price: 1199,
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tables',
    color: 'black',
    description: 'Spacious executive desk with built-in storage and cable management. Perfect for home office or professional workspace.',
    specifications: {
      material: 'Solid wood with metal hardware',
      dimensions: '60" W x 30" D x 30" H',
      weight: '150 lbs',
      warranty: '7 years'
    },
    inStock: true,
    featured: true,
    bestseller: false
  },
  {
    id: '12',
    name: 'Upholstered Bench',
    price: 349,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'chairs',
    color: 'gray',
    description: 'Elegant upholstered bench perfect for entryways, bedrooms, or dining areas. Combines style and functionality.',
    specifications: {
      material: 'Fabric upholstery with wood legs',
      dimensions: '48" W x 18" D x 18" H',
      weight: '40 lbs',
      warranty: '2 years'
    },
    inStock: true,
    featured: false,
    bestseller: true
  }
];

export const categories = [
  { id: 'all', name: 'All Products', icon: '🏠' },
  { id: 'sofas', name: 'Sofas', icon: '🛋️' },
  { id: 'chairs', name: 'Chairs', icon: '🪑' },
  { id: 'tables', name: 'Tables', icon: '🪑' },
  { id: 'beds', name: 'Beds', icon: '🛏️' },
  { id: 'storage', name: 'Storage', icon: '📦' }
];

export const colors = [
  { id: 'all', name: 'All Colors', value: '' },
  { id: 'black', name: 'Black', value: 'black' },
  { id: 'brown', name: 'Brown', value: 'brown' },
  { id: 'gray', name: 'Gray', value: 'gray' },
  { id: 'blue', name: 'Blue', value: 'blue' },
  { id: 'beige', name: 'Beige', value: 'beige' },
  { id: 'white', name: 'White', value: 'white' },
  { id: 'clear', name: 'Clear', value: 'clear' }
];
