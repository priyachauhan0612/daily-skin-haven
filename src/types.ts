
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercentage: number;
  images: string[];
  description: string;
  shortDescription: string;
  ingredients: string;
  directions: string;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}
