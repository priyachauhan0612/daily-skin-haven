
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { mockProducts } from '@/data/mockProducts';
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";

// Get unique brands from mock data
const allBrands = [...new Set(mockProducts.map(product => product.brand))];
// Get unique concerns/tags from mock data
const allTags = [...new Set(mockProducts.flatMap(product => product.tags))];
// Get price range
const minPrice = Math.min(...mockProducts.map(product => product.price));
const maxPrice = Math.max(...mockProducts.map(product => product.price));

const ShopPage: React.FC = () => {
  const { category, brand, concern, tag } = useParams();
  const [products, setProducts] = useState(mockProducts);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(brand ? [brand] : []);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(
    concern ? [concern] : (tag ? [tag] : [])
  );
  
  // Define filter sections
  const filterSections = [
    {
      id: 'brand',
      name: 'Brand',
      options: allBrands.map(brand => ({ value: brand, label: brand })),
      expanded: true,
    },
    {
      id: 'concern',
      name: 'Concerns',
      options: allTags.map(tag => ({ value: tag, label: tag })),
      expanded: true,
    },
    {
      id: 'price',
      name: 'Price Range',
      expanded: true,
    },
  ];
  
  // State for tracking expanded filter sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    brand: true,
    concern: true,
    price: true,
  });
  
  // Toggle filter section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };
  
  // Apply filters
  const applyFilters = () => {
    let filteredProducts = [...mockProducts];
    
    // Filter by category if provided
    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by brand if selected
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => selectedBrands.includes(product.brand)
      );
    }
    
    // Filter by concerns/tags if selected
    if (selectedConcerns.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => product.tags.some(tag => selectedConcerns.includes(tag))
      );
    }
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setProducts(filteredProducts);
    // Close mobile filters after applying
    setMobileFiltersOpen(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedConcerns([]);
    setPriceRange([minPrice, maxPrice]);
    setProducts(mockProducts);
  };
  
  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  // Toggle concern selection
  const toggleConcern = (concern: string) => {
    setSelectedConcerns(prev =>
      prev.includes(concern)
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="h-auto p-0 text-sm text-gray-500 hover:text-black"
              >
                Reset
              </Button>
            </div>
            
            {filterSections.map((section) => (
              <div key={section.id} className="mb-6 border-b pb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-4" 
                  onClick={() => toggleSection(section.id)}
                >
                  <h3 className="font-medium">{section.name}</h3>
                  {expandedSections[section.id] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                
                {expandedSections[section.id] && (
                  <div>
                    {section.id === 'brand' && (
                      <div className="space-y-2">
                        {section.options?.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <Checkbox 
                              id={`brand-${option.value}`}
                              checked={selectedBrands.includes(option.value)}
                              onCheckedChange={() => toggleBrand(option.value)}
                              className="mr-2"
                            />
                            <label 
                              htmlFor={`brand-${option.value}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.id === 'concern' && (
                      <div className="space-y-2">
                        {section.options?.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <Checkbox 
                              id={`concern-${option.value}`}
                              checked={selectedConcerns.includes(option.value)}
                              onCheckedChange={() => toggleConcern(option.value)}
                              className="mr-2"
                            />
                            <label 
                              htmlFor={`concern-${option.value}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.id === 'price' && (
                      <div>
                        <Slider 
                          value={priceRange}
                          min={minPrice}
                          max={maxPrice}
                          step={50}
                          onValueChange={setPriceRange}
                          className="mt-6"
                        />
                        <div className="flex justify-between mt-2 text-sm">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            <Button 
              onClick={applyFilters} 
              className="w-full bg-black hover:bg-gray-800"
            >
              Apply Filters
            </Button>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-1">
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 
                 brand ? `${brand.charAt(0).toUpperCase() + brand.slice(1)}` :
                 concern ? `${concern.charAt(0).toUpperCase() + concern.slice(1)}` :
                 tag ? `${tag.charAt(0).toUpperCase() + tag.slice(1)}` :
                 'All Products'}
              </h1>
              <p className="text-gray-600">{products.length} products</p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              {/* Filter button (mobile only) */}
              <Button 
                variant="outline" 
                className="md:hidden flex items-center"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              
              {/* Sort dropdown */}
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="bestselling">Best Selling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileFiltersOpen(false)}
                className="h-auto p-0"
              >
                <X size={20} />
              </Button>
            </div>
            
            {filterSections.map((section) => (
              <div key={section.id} className="mb-6 border-b pb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-4" 
                  onClick={() => toggleSection(section.id)}
                >
                  <h3 className="font-medium">{section.name}</h3>
                  {expandedSections[section.id] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                
                {expandedSections[section.id] && (
                  <div>
                    {section.id === 'brand' && (
                      <div className="space-y-2">
                        {section.options?.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <Checkbox 
                              id={`mobile-brand-${option.value}`}
                              checked={selectedBrands.includes(option.value)}
                              onCheckedChange={() => toggleBrand(option.value)}
                              className="mr-2"
                            />
                            <label 
                              htmlFor={`mobile-brand-${option.value}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.id === 'concern' && (
                      <div className="space-y-2">
                        {section.options?.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <Checkbox 
                              id={`mobile-concern-${option.value}`}
                              checked={selectedConcerns.includes(option.value)}
                              onCheckedChange={() => toggleConcern(option.value)}
                              className="mr-2"
                            />
                            <label 
                              htmlFor={`mobile-concern-${option.value}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.id === 'price' && (
                      <div>
                        <Slider 
                          value={priceRange}
                          min={minPrice}
                          max={maxPrice}
                          step={50}
                          onValueChange={setPriceRange}
                          className="mt-6"
                        />
                        <div className="flex justify-between mt-2 text-sm">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex gap-3 mt-8">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={resetFilters}
              >
                Reset
              </Button>
              <Button 
                className="flex-1 bg-black hover:bg-gray-800"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
