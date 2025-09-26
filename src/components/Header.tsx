import React from 'react';
import { Home, ShoppingCart, User, Search, HelpCircle, BarChart3 } from 'lucide-react';
import { User as UserType } from '../types';

type HeaderProps = {
  cartItems: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onHomeClick: () => void;
  onCartClick: () => void;
  onProfileClick: () => void;
  onAboutClick: () => void;
  onStatsClick: () => void; // 👈 NUEVO
  user: UserType | null;
};

function Header({ 
  cartItems, 
  searchQuery, 
  onSearchChange, 
  onHomeClick, 
  onCartClick, 
  onProfileClick,
  onAboutClick,
  onStatsClick,
  user
}: HeaderProps) {
  return (
    <header className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: '#EB9898' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left side - About, Home, Cart, Stats (solo admin) */}
          <div className="flex items-center space-x-4">
            {/* Botón About */}
            <button
              onClick={onAboutClick}
              className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors duration-200 shadow-sm"
            >
              <HelpCircle className="h-5 w-5" style={{ color: '#EB9898' }} />
            </button>

            {/* Botón Home */}
            <button
              onClick={onHomeClick}
              className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors duration-200 shadow-sm"
            >
              <Home className="h-5 w-5" style={{ color: '#EB9898' }} />
            </button>

            {/* Botón Carrito */}
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-lg bg-white/80 hover:bg-white transition-colors duration-200 shadow-sm"
            >
              <ShoppingCart className="h-5 w-5" style={{ color: '#EB9898' }} />
              {cartItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  style={{ backgroundColor: '#D4F663' }}
                >
                  {cartItems > 99 ? '99+' : cartItems}
                </span>
              )}
            </button>

            {/* Botón Estadísticas (solo admin) */}
            {user?.isAdmin && (
              <button
                onClick={onStatsClick}
                className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors duration-200 shadow-sm"
              >
                <BarChart3 className="h-5 w-5" style={{ color: '#EB9898' }} />
              </button>
            )}
          </div>

          {/* Center - Search bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar productos..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-white/90 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side - Profile button */}
          <div className="flex items-center">
            <button
              onClick={onProfileClick}
              className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors duration-200 shadow-sm"
            >
              <User className="h-5 w-5" style={{ color: '#EB9898' }} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
