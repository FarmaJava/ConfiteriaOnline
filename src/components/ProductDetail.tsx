import React, { useState } from 'react';
import { ArrowLeft, Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product, Review } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    user: 'maria_gutierrez15',
    rating: 5,
    comment: 'Excelente para compartir el fin de la familia.',
    date: '2024-01-15'
  },
  {
    id: 2,
    user: 'carlos_292',
    rating: 5,
    comment: 'Excelente para compartir con amigos.',
    date: '2024-01-10'
  },
  {
    id: 3,
    user: 'ana_maria24',
    rating: 4,
    comment: 'Buena calidad y el horario es muy dulce casi lo demandado, generalmente. Mi compra está por exigente muy exigente muy exigente.',
    date: '2024-01-08'
  },
  {
    id: 4,
    user: 'compradores',
    rating: 4,
    comment: 'Buena calidad y el horario es muy dulce casi lo demandado.',
    date: '2024-01-05'
  }
];

function ProductDetail({ product, onAddToCart, onBack }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 hover:opacity-80 mb-6 transition-colors"
        style={{ color: '#EB9898' }}
      >
        <ArrowLeft className="h-5 w-5" />
        Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4" 
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#EB9898'
              }}>
            {product.name}
          </h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg text-gray-600">
              {product.rating} ({product.reviews} reseñas)
            </span>
          </div>
          
          <p className="text-6xl font-bold mb-6" style={{ color: '#EB9898' }}>
            ${product.price}
          </p>
          
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {product.description}. Una deliciosa creación artesanal que combina los mejores ingredientes 
            para ofrecerte una experiencia única llena de sabor y dulzura.
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-lg font-medium text-gray-700">Cantidad:</span>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-semibold min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-sm text-gray-500">
              ({product.stock} disponibles)
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product, quantity)}
            className="w-full text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{ backgroundColor: '#EB9898' }}
          >
            <ShoppingCart className="h-6 w-6" />
            Agregar al Carrito
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8" 
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: '#EB9898'
            }}>
          Comentarios
        </h2>
        
        <div className="space-y-6">
          {SAMPLE_REVIEWS.map(review => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: '#D4F663' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EB9898' }}>
                  <span className="text-white font-semibold">
                    {review.user.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{review.user}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;