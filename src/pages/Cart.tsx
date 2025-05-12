
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/useCart';
import { Trash2, ChevronRight, ArrowLeft } from "lucide-react";

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
        <p className="mb-8">Your cart is currently empty.</p>
        <Link to="/shop">
          <Button className="bg-black hover:bg-gray-800">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-600 border-b pb-2">
            <div className="col-span-6">Product</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          
          {items.map((item) => (
            <div 
              key={`${item.product.id}-${item.variant || 'default'}`}
              className="grid grid-cols-12 gap-4 py-6 border-b items-center"
            >
              {/* Product */}
              <div className="col-span-12 md:col-span-6 flex items-center">
                <div className="w-20 h-20 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <Link to={`/product/${item.product.id}`} className="font-medium hover:text-gray-800">
                    {item.product.name}
                  </Link>
                  <div className="text-gray-500 text-sm">{item.product.brand}</div>
                  {item.variant && (
                    <div className="text-gray-500 text-sm">{item.variant}</div>
                  )}
                  <button 
                    onClick={() => removeItem(item.product.id, item.variant)}
                    className="flex items-center text-red-500 hover:text-red-700 text-sm mt-2 md:hidden"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
              
              {/* Price */}
              <div className="col-span-4 md:col-span-2">
                <div className="md:hidden text-gray-500 text-sm mb-1">Price:</div>
                <div>₹{item.product.price.toFixed(2)}</div>
              </div>
              
              {/* Quantity */}
              <div className="col-span-4 md:col-span-2">
                <div className="md:hidden text-gray-500 text-sm mb-1">Quantity:</div>
                <div className="flex border border-gray-300 rounded-md max-w-[96px]">
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                    className="px-2 py-1 border-r border-gray-300"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                    className="px-2 py-1 border-l border-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Total */}
              <div className="col-span-3 md:col-span-2 md:text-right">
                <div className="md:hidden text-gray-500 text-sm mb-1">Total:</div>
                <div className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
              
              {/* Remove (desktop) */}
              <div className="col-span-1 text-right hidden md:block">
                <button 
                  onClick={() => removeItem(item.product.id, item.variant)}
                  className="text-gray-500 hover:text-red-500"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          
          {/* Continue Shopping */}
          <div className="mt-8">
            <Link to="/shop" className="inline-flex items-center text-gray-600 hover:text-black">
              <ArrowLeft size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full bg-black hover:bg-gray-800">
              Proceed to Checkout
            </Button>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              Taxes and shipping calculated at checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
