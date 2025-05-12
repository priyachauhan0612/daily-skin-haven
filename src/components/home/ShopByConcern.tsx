
import React from 'react';
import { Link } from 'react-router-dom';

interface Concern {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const concerns: Concern[] = [
  {
    id: 'acne',
    name: 'Acne & Breakouts',
    description: 'Clear formulas to fight blemishes',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    link: '/shop/concern/acne',
  },
  {
    id: 'dryness',
    name: 'Dryness',
    description: 'Hydration for thirsty skin',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    link: '/shop/concern/dryness',
  },
  {
    id: 'anti-aging',
    name: 'Anti-Aging',
    description: 'Fight fine lines and wrinkles',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    link: '/shop/concern/anti-aging',
  },
];

const ShopByConcern: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Shop by Concern</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Find the perfect solutions tailored to your skin's unique needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {concerns.map((concern) => (
            <Link 
              to={concern.link} 
              key={concern.id}
              className="group block bg-gray-50 rounded-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={concern.image} 
                  alt={concern.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-semibold text-xl mb-1">{concern.name}</h3>
                    <p className="text-gray-200 text-sm">{concern.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByConcern;
