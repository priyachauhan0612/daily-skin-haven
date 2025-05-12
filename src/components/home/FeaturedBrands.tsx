
import React from 'react';
import { Link } from 'react-router-dom';

interface Brand {
  id: string;
  name: string;
  logo: string;
  link: string;
}

const brands: Brand[] = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    logo: 'https://via.placeholder.com/200x80?text=Minimalist',
    link: '/shop/brand/minimalist',
  },
  {
    id: 'quench',
    name: 'Quench',
    logo: 'https://via.placeholder.com/200x80?text=Quench',
    link: '/shop/brand/quench',
  },
  {
    id: 'dot-key',
    name: 'Dot & Key',
    logo: 'https://via.placeholder.com/200x80?text=Dot+%26+Key',
    link: '/shop/brand/dot-key',
  },
  {
    id: 'plum',
    name: 'Plum',
    logo: 'https://via.placeholder.com/200x80?text=Plum',
    link: '/shop/brand/plum',
  },
  {
    id: 'ordinary',
    name: 'The Ordinary',
    logo: 'https://via.placeholder.com/200x80?text=The+Ordinary',
    link: '/shop/brand/ordinary',
  },
];

const FeaturedBrands: React.FC = () => {
  return (
    <section className="bg-skincare-gray py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Our Featured Brands</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We've partnered with the best in skincare to bring you effective, high-quality products
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
          {brands.map((brand) => (
            <Link 
              to={brand.link} 
              key={brand.id}
              className="bg-white rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                className="w-full max-h-16 object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
