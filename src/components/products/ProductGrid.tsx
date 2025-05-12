
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, columns = 4 }) => {
  const getGridClass = () => {
    switch (columns) {
      case 2: return "grid-cols-1 sm:grid-cols-2";
      case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      default: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
  };

  return (
    <div className={`grid ${getGridClass()} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
