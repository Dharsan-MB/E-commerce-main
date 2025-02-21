import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from './CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  // Simplified navbar for login and register pages
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') {
    return (
      <nav className="bg-[#F8D706] shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/home" className="flex items-center">
              <span className="text-2xl font-bold text-green-600">Veggie</span>
              <span className="text-2xl font-bold text-slate-700">Vault</span>
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-[#F8D706] shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/home" className="flex items-center">
            <span className="text-2xl font-bold text-green-600">Veggie</span>
            <span className="text-2xl font-bold text-slate-700">Vault</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/home" className="text-gray-600 hover:text-green-600">Home</NavLink>
            <NavLink to="/vegetables" className="text-gray-600 hover:text-green-600">Vegetables</NavLink>
            <NavLink to="/fruits" className="text-gray-600 hover:text-green-600">Fruits</NavLink>
            <NavLink to="/groceries" className="text-gray-600 hover:text-green-600">Groceries</NavLink>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                />
                <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-green-600">
                  <FiSearch size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/cart"
              className="relative text-gray-800 hover:text-green-600 transition-colors duration-200"
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
            <NavLink to="/login" className="text-gray-600 hover:text-green-600">
              <FiUser size={24} />
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-green-600">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink to="/home" className="block px-3 py-2 text-gray-600 hover:text-green-600">Home</NavLink>
              <NavLink to="/vegetables" className="block px-3 py-2 text-gray-600 hover:text-green-600">Vegetables</NavLink>
              <NavLink to="/fruits" className="block px-3 py-2 text-gray-600 hover:text-green-600">Fruits</NavLink>
              <NavLink to="/groceries" className="block px-3 py-2 text-gray-600 hover:text-green-600">Groceries</NavLink>
              <NavLink to="/cart" className="block px-3 py-2 text-gray-600 hover:text-green-600">Cart</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;