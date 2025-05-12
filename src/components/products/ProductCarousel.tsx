
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';

interface ProductCarouselProps {
  products: Product[];
  title: string;
  subtitle?: string;
  featured?: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  products, 
  title, 
  subtitle,
  featured = false 
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      const currentScroll = carouselRef.current.scrollLeft;
      carouselRef.current.scrollTo({
        left: direction === 'left' 
          ? currentScroll - scrollAmount 
          : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full border-gray-200"
            onClick={() => scroll('left')}
          >
            <ChevronLeft size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full border-gray-200"
            onClick={() => scroll('right')}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
      
      <div 
        ref={carouselRef} 
        className="carousel flex gap-6 overflow-x-auto pb-4 -mx-4 px-4"
      >
        {products.map(product => (
          <div key={product.id} className="min-w-[260px] max-w-[260px] flex-shrink-0">
            <ProductCard product={product} featured={featured} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
