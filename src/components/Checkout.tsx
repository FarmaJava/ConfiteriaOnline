import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

function Checkout({ items, onBack, onComplete }: CheckoutProps) {
  const [step, setStep] = useState<'card' | 'address'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [addressData, setAddressData] = useState({
    address: '',
    province: '',
    city: '',
    phone: '',
    notes: '',
    dni: '',
    zipcode: ''
  });

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('address');
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Pedido realizado con éxito! Recibirás una confirmación por email.');
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={step === 'card' ? onBack : () => setStep('card')}
        className="flex items-center gap-2 hover:opacity-80 mb-6 transition-colors"
        style={{ color: '#EB9898' }}
      >
        <ArrowLeft className="h-5 w-5" />
        Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          {step === 'card' ? (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="-mx-6 -mt-6 px-6 py-4 rounded-t-2xl mb-6" style={{ backgroundColor: '#EB9898' }}>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Datos de la Tarjeta
                </h2>
              </div>

              <form onSubmit={handleCardSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    value={cardData.number}
                    onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#EB9898' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Titular
                  </label>
                  <input
                    type="text"
                    value={cardData.name}
                    onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#EB9898' }}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vencimiento
                    </label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                      placeholder="MM/AA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#EB9898' }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardData.cvv}
                      onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#EB9898' }}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                  style={{ backgroundColor: '#EB9898' }}
                >
                  Continuar
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="-mx-6 -mt-6 px-6 py-4 rounded-t-2xl mb-6" style={{ backgroundColor: '#EB9898' }}>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Datos del Domicilio
                </h2>
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección completa de entrega
                  </label>
                  <input
                    type="text"
                    value={addressData.address}
                    onChange={(e) => setAddressData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Calle 123, Apartamento 4B"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#EB9898' }}
                    required
                  />
                </div>

                              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Codigo Postal
                  </label>
                  <input
                    type="number"
                    value={addressData.zipcode}
                    onChange={(e) => setAddressData(prev => ({ ...prev, zipcode: e.target.value }))}
                    placeholder="3077"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#EB9898' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provincia
                  </label>
                  <input
                    type="text"
                    value={addressData.province}
                    onChange={(e) => setAddressData(prev => ({ ...prev, province: e.target.value }))}
                    placeholder="Buenos Aires"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#EB9898' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={addressData.city}
                    onChange={(e) => setAddressData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Alta Gracia"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#EB9898' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número
                  </label>
                  <input
                    type="tel"
                    value={addressData.phone}
                    onChange={(e) => setAddressData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+54 11 1234-5678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#EB9898' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documento Nacional de Identidad
                  </label>
                  <input
                    type="number"
                    value={addressData.dni}
                    onChange={(e) => setAddressData(prev => ({ ...prev, dni: e.target.value }))}
                    placeholder="46669231"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#EB9898' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aclaraciones
                  </label>
                  <textarea
                    value={addressData.notes}
                    onChange={(e) => setAddressData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Instrucciones adicionales para la entrega..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent resize-none"
                    style={{ focusRingColor: '#EB9898' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                  style={{ backgroundColor: '#D4F663' }}
                >
                  Confirmar Pedido
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Resumen del Pedido</h3>
            
            <div className="space-y-3 mb-6">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-semibold" style={{ color: '#EB9898' }}>
                    ${item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold" style={{ color: '#EB9898' }}>
                <span>TOTAL:</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;