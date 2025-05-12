
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items } = useCart();
  
  const totalItems = items.length;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close search if it's open
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Close menu if it's open
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-semibold md:text-2xl">Glow Naturally</h1>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-gray-600 transition-colors">Home</Link>
            <Link to="/shop" className="text-sm font-medium hover:text-gray-600 transition-colors">Shop</Link>
            <Link to="/about" className="text-sm font-medium hover:text-gray-600 transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-gray-600 transition-colors">Contact</Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="hidden md:flex">
              <Search size={20} />
            </Button>
            <Link to="/account">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User size={20} />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-black text-white text-xs rounded-full">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              <Menu size={20} />
            </Button>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        {isSearchOpen && (
          <div className="hidden md:block py-3 border-t">
            <div className="relative">
              <Input
                placeholder="Search for products..."
                className="w-full"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/shop" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
              <Link to="/about" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <div className="relative">
                <Input placeholder="Search for products..." className="w-full" />
              </div>
              <Link to="/account" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                My Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
