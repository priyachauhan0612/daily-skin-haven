
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from '@/hooks/useCart';
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className={`product-card bg-white rounded-lg overflow-hidden ${featured ? 'shadow-md' : ''}`}>
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-[280px] object-cover"
          />
          {product.isNew && (
            <Badge className="absolute top-2 left-2 bg-black text-white">New</Badge>
          )}
          {product.discountPercentage > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
              <h3 className="font-medium text-base mb-1 line-clamp-1">{product.name}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-baseline">
              <span className="font-semibold text-lg">₹{product.price.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="text-gray-400 text-sm line-through ml-2">
                  ₹{(product.price * (100 + product.discountPercentage) / 100).toFixed(2)}
                </span>
              )}
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-9 w-9 p-0 rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
