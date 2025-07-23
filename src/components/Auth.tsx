import React, { useState } from 'react'; 
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface AuthProps {
  onBack: () => void;
  onAdminAccess: () => void;
  message?: string; // <-- nuevo
}

function Auth({ onBack, onAdminAccess, message }: AuthProps) {
  const { user, login, logout } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // 🔴 VERIFICAMOS SI VIENE DEL CARRITO
  const [cameFromCart] = useState(() => {
    const flag = sessionStorage.getItem('cameFromCart');
    if (flag) {
      sessionStorage.removeItem('cameFromCart');
      return true;
    }
    return false;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isAdmin = formData.email === 'admin@candycrushers.com';

    login({
      id: 1,
      name: isAdmin ? 'Administrador' : formData.name || 'Usuario',
      email: formData.email,
      isAdmin
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (user) {
    return (
      
      <div className="max-w-md mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:opacity-80 mb-6 transition-colors"
          style={{ color: '#EB9898' }}
        >
          <ArrowLeft className="h-5 w-5" />
          Volver
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#EB9898' }}>
              <span className="text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            {user.isAdmin && (
              <span className="inline-block text-white px-3 py-1 rounded-full text-sm font-medium mt-2" style={{ backgroundColor: '#D4F663' }}>
                Administrador
              </span>
            )}
          </div>

          <div className="space-y-4">
            {user.isAdmin && (
              <button
                onClick={onAdminAccess}
                className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                style={{ backgroundColor: '#D4F663' }}
              >
                Panel de Administración
              </button>
            )}
            
            <button
              onClick={logout}
              className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 hover:opacity-80 mb-6 transition-colors"
        style={{ color: '#EB9898' }}
      >
        <ArrowLeft className="h-5 w-5" />
        Volver
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="-mx-8 -mt-8 px-8 py-6 rounded-t-2xl mb-6" style={{ backgroundColor: '#EB9898' }}>
          <h2 className="text-2xl font-bold text-white text-center">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </h2>
        </div>

        {message && (
        <div className="mb-4 text-center text-sm font-medium text-red-500">
        {message}
        </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email / Usuario</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required={!isLogin}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#EB9898' }}
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium transition-colors"
            style={{ color: '#EB9898' }}
          >
            {isLogin 
              ? '¿No tienes cuenta? Regístrate' 
              : '¿Ya tienes cuenta? Inicia sesión'
            }
          </button>
        </div>

        {isLogin && (
          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(212, 246, 99, 0.2)' }}>
            <p className="text-sm" style={{ color: '#D4F663' }}>
              <strong>Para administradores:</strong><br />
              Email: admin@candycrushers.com<br />
              Contraseña: cualquiera
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
