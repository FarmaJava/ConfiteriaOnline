import React from 'react';
import { Star, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const CATEGORIES = [
  { id: '', name: 'Todos', color: 'bg-gray-100' },
  { id: 'tortas', name: 'Tortas', color: '#EB9898' },
  { id: 'caramelos', name: 'Caramelos', color: '#D4F663' },
  { id: 'alfajores', name: 'Alfajores', color: '#EB9898' },
  { id: 'budines', name: 'Budines', color: '#D4F663' },
  { id: 'galletas', name: 'Galletas', color: '#EB9898' },
  { id: 'chocolates', name: 'Chocolates', color: '#D4F663' }
];

function ProductGrid({ products, onProductClick, onCategorySelect, selectedCategory }: ProductGridProps) {
  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    // This will be handled by the parent component through onProductClick
    onProductClick(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4" 
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: '#EB9898'
            }}>
          Productos Destacados
        </h2>
        <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#D4F663' }}></div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
              selectedCategory === category.id
                ? 'text-white shadow-lg transform scale-105'
                : 'text-gray-700 hover:shadow-md'
            }`}
            style={{
              backgroundColor: selectedCategory === category.id 
                ? '#EB9898' 
                : (category.id === '' ? '#f3f4f6' : category.color + '40')
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
            onClick={() => onProductClick(product)}
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="text-white text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: '#D4F663' }}>
                  {CATEGORIES.find(cat => cat.id === product.category)?.name || 'Producto'}
                </span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={(e) => handleAddToCartClick(e, product)}
                  className="text-white p-2 rounded-full transition-colors hover:scale-110" 
                  style={{ backgroundColor: '#EB9898' }}
                  title="Ver producto"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                {product.name}
              </h3>
              
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">
                  ({product.reviews})
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold" style={{ color: '#EB9898' }}>
                  ${product.price}
                </span>
                <span className={`text-sm font-medium ${
                  product.stock > 10 ? 'text-green-600' : 
                  product.stock > 5 ? 'text-yellow-600' : 
                  product.stock > 0 ? 'text-red-600' : 'text-gray-400'
                }`}>
                  {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;