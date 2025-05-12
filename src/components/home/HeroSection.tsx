
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Glow Naturally
              <br />
              <span className="text-gray-700">Skincare for Every You</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Discover scientifically formulated products that treat your skin with the care it deserves. Clean formulas, proven results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" className="bg-black hover:bg-gray-800 rounded-full">
                  Shop Now
                </Button>
              </Link>
              <Link to="/concern">
                <Button size="lg" variant="outline" className="rounded-full">
                  Find Your Match
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="bg-skincare-peach rounded-full absolute -top-4 -right-4 w-28 h-28 md:w-48 md:h-48"></div>
              <div className="bg-skincare-blue rounded-full absolute -bottom-4 -left-4 w-28 h-28 md:w-40 md:h-40"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Woman applying skincare products" 
                className="relative z-10 rounded-lg shadow-lg w-full object-cover max-h-[500px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
