
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { ShoppingCart, Heart, Star, ChevronRight } from "lucide-react";
import ProductCarousel from '@/components/products/ProductCarousel';
import { mockProducts } from '@/data/mockProducts';
import { useCart } from '@/hooks/useCart';
import { useToast } from "@/components/ui/use-toast";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = mockProducts.find(p => p.id === id);
  const relatedProducts = mockProducts.filter(p => 
    p.id !== id && p.category === product?.category
  ).slice(0, 10);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight size={14} className="mx-1" />
            <Link to="/shop" className="hover:text-gray-900">Shop</Link>
            <ChevronRight size={14} className="mx-1" />
            <Link to={`/shop/brand/${product.brand.toLowerCase()}`} className="hover:text-gray-900">
              {product.brand}
            </Link>
            <ChevronRight size={14} className="mx-1" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product Detail */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-50">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  className={`aspect-square overflow-hidden rounded-md ${
                    index === selectedImage 
                      ? 'ring-2 ring-black' 
                      : 'ring-1 ring-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <Link to={`/shop/brand/${product.brand.toLowerCase()}`}>
                  <p className="text-gray-500 text-sm hover:text-black">{product.brand}</p>
                </Link>
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={16}
                      fill={i < product.rating ? "currentColor" : "none"}
                      className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.reviewCount} reviews
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-baseline mb-6">
                <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-gray-400 text-lg line-through ml-3">
                      ₹{(product.price * (100 + product.discountPercentage) / 100).toFixed(2)}
                    </span>
                    <Badge className="ml-3 bg-red-500 text-white">
                      {product.discountPercentage}% OFF
                    </Badge>
                  </>
                )}
              </div>
              
              {/* Short Description */}
              <p className="text-gray-600 mb-6">{product.shortDescription}</p>
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="mr-4 text-sm font-medium">Quantity</span>
                <div className="flex border border-gray-300 rounded-md">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-1 border-r border-gray-300"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-1 border-l border-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="flex space-x-4 mb-8">
                <Button 
                  onClick={handleAddToCart} 
                  size="lg" 
                  className="flex-1 bg-black hover:bg-gray-800 text-white"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart size={18} />
                </Button>
              </div>
              
              {/* Product Meta Info */}
              <div className="space-y-3 border-t border-gray-200 pt-6 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-900 w-24">SKU:</span>
                  <span className="text-gray-600">{product.sku}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-24">Category:</span>
                  <Link to={`/shop/category/${product.category.toLowerCase()}`} className="text-gray-600 hover:text-black">
                    {product.category}
                  </Link>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-24">Tags:</span>
                  <div>
                    {product.tags.map((tag, index) => (
                      <React.Fragment key={tag}>
                        <Link to={`/shop/tag/${tag.toLowerCase()}`} className="text-gray-600 hover:text-black">
                          {tag}
                        </Link>
                        {index < product.tags.length - 1 && <span className="mx-1">,</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-4">
              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="ingredients" className="p-4">
              <div className="prose max-w-none">
                <p className="mb-4">Ingredients:</p>
                <p>{product.ingredients}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="how-to-use" className="p-4">
              <div className="prose max-w-none">
                <p className="mb-4">Directions:</p>
                <p>{product.directions}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-4">
              <div className="prose max-w-none">
                <p>Customer Reviews will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="container mx-auto px-4 py-16">
        <ProductCarousel 
          title="You May Also Like" 
          products={relatedProducts}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
