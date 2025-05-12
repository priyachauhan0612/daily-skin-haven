
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ProductCarousel from '@/components/products/ProductCarousel';
import ShopByConcern from '@/components/home/ShopByConcern';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import { mockProducts } from '@/data/mockProducts';

const Index: React.FC = () => {
  const featuredProducts = mockProducts.filter(p => p.featured);
  const bestSellers = mockProducts.filter(p => p.bestseller);
  const newArrivals = mockProducts.filter(p => p.isNew);
  
  return (
    <div>
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16">
        <ProductCarousel 
          title="Featured Products" 
          subtitle="Hand-picked favorites just for you"
          products={featuredProducts}
          featured={true}
        />
      </div>
      
      <ShopByConcern />
      
      <div className="container mx-auto px-4 py-16">
        <ProductCarousel 
          title="Best Sellers" 
          subtitle="Our customers' most-loved products"
          products={bestSellers}
        />
      </div>
      
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <ProductCarousel 
            title="New Arrivals" 
            subtitle="The latest additions to our collection"
            products={newArrivals}
          />
        </div>
      </div>
      
      <FeaturedBrands />
    </div>
  );
};

export default Index;
