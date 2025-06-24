import React, { useState } from 'react';
import { ArrowLeft, Package, Users, TrendingUp, Eye, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Product } from '../types';

interface AdminProps {
  products: Product[];
  onBack: () => void;
  onProductsUpdate: (products: Product[]) => void;
}

const SAMPLE_ORDERS = [
  {
    id: 1,
    user: 'maria_gutierrez15',
    date: '2024-01-15',
    status: 'Pendiente'
  },
  {
    id: 2,
    user: 'carlos_292',
    date: '2024-01-14',
    status: 'Enviado'
  },
  {
    id: 3,
    user: 'ana_maria24',
    date: '2024-01-13',
    status: 'Completado'
  },
  {
    id: 4,
    user: 'compradores',
    date: '2024-01-12',
    status: 'Pendiente'
  }
];

const CATEGORIES = [
  'tortas',
  'caramelos', 
  'alfajores',
  'budines',
  'galletas',
  'chocolates'
];

interface ProductFormData {
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

function Admin({ products: initialProducts, onBack, onProductsUpdate }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'stock' | 'orders'>('stock');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'tortas',
    description: '',
    price: 0,
    stock: 0,
    image: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'tortas',
      description: '',
      price: 0,
      stock: 0,
      image: ''
    });
  };

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    onProductsUpdate(newProducts);
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.description || formData.price <= 0) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      image: formData.image || 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      reviews: 0
    };

    const updatedProducts = [...products, newProduct];
    updateProducts(updatedProducts);
    setShowAddForm(false);
    resetForm();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image
    });
  };

  const handleUpdateProduct = () => {
    if (!editingProduct || !formData.name || !formData.description || formData.price <= 0) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const updatedProducts = products.map(product =>
      product.id === editingProduct.id
        ? {
            ...product,
            name: formData.name,
            category: formData.category,
            description: formData.description,
            price: formData.price,
            stock: formData.stock,
            image: formData.image
          }
        : product
    );

    updateProducts(updatedProducts);
    setEditingProduct(null);
    resetForm();
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const updatedProducts = products.filter(product => product.id !== productId);
      updateProducts(updatedProducts);
    }
  };

  const handleStockUpdate = (productId: number, newStock: number) => {
    if (newStock < 0) return;
    
    const updatedProducts = products.map(product =>
      product.id === productId
        ? { ...product, stock: newStock }
        : product
    );
    updateProducts(updatedProducts);
  };

  const handleFormChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    resetForm();
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

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-6" style={{ backgroundColor: '#EB9898' }}>
          <h1 className="text-3xl font-bold text-white mb-4">Panel de Administración</h1>
          
          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('stock')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'stock'
                  ? 'bg-white shadow-md'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              style={{ color: activeTab === 'stock' ? '#EB9898' : '#EB9898' }}
            >
              <Package className="h-4 w-4 inline mr-2" />
              Administración de Stock
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'orders'
                  ? 'bg-white shadow-md'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              style={{ color: activeTab === 'orders' ? '#EB9898' : '#EB9898' }}
            >
              <Users className="h-4 w-4 inline mr-2" />
              Pedidos Registrados
            </button>
          </div>
        </div>

        {activeTab === 'stock' && (
          <div className="p-6">
            {/* Add Product Button */}
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Gestión de Productos</h3>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#D4F663' }}
              >
                <Plus className="h-4 w-4" />
                Agregar Producto
              </button>
            </div>

            {/* Add/Edit Product Form */}
            {(showAddForm || editingProduct) && (
              <div className="mb-8 p-6 border-2 border-dashed rounded-lg" style={{ borderColor: '#EB9898' }}>
                <h4 className="text-lg font-semibold mb-4" style={{ color: '#EB9898' }}>
                  {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Producto *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#EB9898' }}
                      placeholder="Ej: Torta de Chocolate"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleFormChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#EB9898' }}
                    >
                      {CATEGORIES.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent resize-none"
                      style={{ focusRingColor: '#EB9898' }}
                      placeholder="Describe el producto..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio ($) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleFormChange('price', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#EB9898' }}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Inicial
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleFormChange('stock', parseInt(e.target.value) || 0)}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#EB9898' }}
                      placeholder="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de Imagen (opcional)
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => handleFormChange('image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ focusRingColor: '#EB9898' }}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                    className="flex items-center gap-2 text-white px-6 py-2 rounded-lg transition-colors"
                    style={{ backgroundColor: '#EB9898' }}
                  >
                    <Save className="h-4 w-4" />
                    {editingProduct ? 'Actualizar' : 'Agregar'} Producto
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Products List */}
            <div className="space-y-4">
              {products.map(product => (
                <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Precio</p>
                    <p className="font-bold" style={{ color: '#EB9898' }}>${product.price}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Stock</p>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleStockUpdate(product.id, product.stock - 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className={`font-bold text-lg min-w-[2rem] text-center ${
                        product.stock > 10 ? 'text-green-600' : 
                        product.stock > 5 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {product.stock}
                      </span>
                      <button
                        onClick={() => handleStockUpdate(product.id, product.stock + 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar producto"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar producto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Lista de Pedidos</h3>
            
            <div className="space-y-4">
              {SAMPLE_ORDERS.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EB9898' }}>
                      <span className="text-white font-semibold">
                        {order.user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{order.user}</p>
                      <p className="text-sm text-gray-500">Pedido #{order.id} - {order.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Completado' ? 'bg-green-100 text-green-800' :
                      order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    
                    <button 
                      onClick={() => alert(`Ver detalles del pedido #${order.id} de ${order.user}`)}
                      className="px-4 py-2 rounded-lg text-white transition-colors flex items-center gap-2 hover:opacity-90" 
                      style={{ backgroundColor: '#EB9898' }}
                    >
                      <Eye className="h-4 w-4" />
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;