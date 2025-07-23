import React from 'react';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { useUser } from '../context/UserContext';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCheckout: () => void;
  onBack: () => void;
}

function Cart({ items, onUpdateQuantity, onCheckout, onBack }: CartProps) {
  const { user } = useUser();

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    onCheckout(); // delega la lógica al componente App
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 hover:opacity-80 mb-6 transition-colors"
        style={{ color: '#EB9898' }}
      >
        <ArrowLeft className="h-5 w-5" />
        Volver
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4" style={{ backgroundColor: '#EB9898' }}>
          <h1 className="text-2xl font-bold text-white">Lista de Productos</h1>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className="p-6">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">{item.product.category}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-semibold min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <p className="font-bold" style={{ color: '#EB9898' }}>
                      ${item.product.price * item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => onUpdateQuantity(item.product.id, 0)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Total Carrito</span>
                <span className="text-2xl font-bold" style={{ color: '#EB9898' }}>${total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#EB9898' }}
              >
                Proceder al Pago
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
