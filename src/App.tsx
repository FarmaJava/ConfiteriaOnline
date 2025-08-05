import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Auth from './components/Auth';
import Checkout from './components/Checkout';
import Admin from './components/Admin';
import { Product, CartItem, User } from './types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Chocolates',
    price: 1200,
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'chocolates',
    description: 'Deliciosos chocolates artesanales',
    rating: 5,
    reviews: 24,
    stock: 10
  },
  {
    id: 2,
    name: 'Cheesecake',
    price: 2500,
    image: 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'tortas',
    description: 'Cheesecake cremoso con frutos rojos',
    rating: 4.8,
    reviews: 18,
    stock: 6
  },
  {
    id: 3,
    name: 'Torta Chocolate',
    price: 3200,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'tortas',
    description: 'Torta de chocolate con ganache',
    rating: 4.9,
    reviews: 32,
    stock: 8
  },
  {
    id: 5,
    name: 'Torta de Oreo con Chocolate',
    price: 2800,
    image: 'https://cdn0.recetasgratis.net/es/posts/6/3/4/torta_oreo_y_dulce_de_leche_76436_orig.jpg',
    category: 'tortas',
    description: 'Torta de Oreo con cobertura de chocolate',
    rating: 4.6,
    reviews: 21,
    stock: 5
  },
  {
    id: 6,
    name: 'Budín de Vainilla y Chocolate',
    price: 1500,
    image: 'https://s3-api-arcor.apps-webs.com/chocoaguila/archivos/recetas/receta-141.webp',
    category: 'budines',
    description: 'Budín marmolado de vainilla y chocolate',
    rating: 4.5,
    reviews: 28,
    stock: 15
  },
  {
    id: 7,
    name: 'Palmeritas',
    price: 1800,
    image: 'https://acdn-us.mitiendanube.com/stores/001/203/846/products/palmeritas-tante-sara-online-51-647f455882f20e92b615903013631635-1024-1024.jpg',
    category: 'galletas',
    description: 'Crujientes palmeritas de hojaldre',
    rating: 4.4,
    reviews: 19,
    stock: 50
  },
  {
    id: 8,
    name: 'Alfajores de maicena',
    price: 950,
    image: 'https://tn.com.ar/resizer/v2/receta-y-todos-los-trucos-para-hacer-alfajores-de-maicena-que-se-deshacen-en-la-boca-foto-gemini-JZC7ZBRT2ZEITGOGFMJQSQ52ZA.jpg?auth=ef08317d051bf6afbbf59b0b75c43f21496d49e1442ec68e35cdf4ebc14b7b12&width=767',
    category: 'alfajores',
    description: 'Alfajores caseros rellenos de dulce de leche',
    rating: 4.8,
    reviews: 67,
    stock: 20
  },{
    id: 9,
    name: 'Cookies con chips de chocolate',
    price: 750,
    image: 'https://resizer.glanacion.com/resizer/v2/cookies-veganas-con-chips-de-PDMO24FOFZEPRJQBBASIINCZQ4.jpg?auth=a31492548c96ee949dcbcf99f93078e59cb642c9b559c0f79d93a21564437488&width=1200&height=800&quality=70&smart=true',
    category: 'galletas',
    description: 'Galletas suaves con abundantes chips de chocolate.',
    rating: 4.9,
    reviews: 120,
    stock: 30
  },
  {
    id: 10,
    name: 'Tarta de frutillas',
    price: 1800,
    image: 'https://acdn-us.mitiendanube.com/stores/413/750/products/20200911_1414281-907801586675d4fd5c15998448698354-640-0.jpg',
    category: 'tortas',
    description: 'Base crocante con crema pastelera y frutillas frescas.',
    rating: 4.7,
    reviews: 89,
    stock: 12
  },
  {
    id: 11,
    name: 'Brownie clásico',
    price: 950,
    image: 'https://cdn.recetasderechupete.com/wp-content/uploads/2019/11/Brownie.jpg',
    category: 'budines',
    description: 'Brownie húmedo de chocolate con nueces, ideal con helado.',
    rating: 4.8,
    reviews: 105,
    stock: 25
  },
  {
    id: 12,
    name: 'Medialunas de manteca',
    price: 800,
    image: 'https://static.wixstatic.com/media/36c539_1474050b4641495aac02a4bcceed6a87~mv2.jpg/v1/fill/w_784,h_519,al_c,q_85/36c539_1474050b4641495aac02a4bcceed6a87~mv2.jpg',
    category: 'galletas',
    description: 'Medialunas artesanales con un dorado perfecto.',
    rating: 4.6,
    reviews: 73,
    stock: 18
  },
  {
    id: 13,
    name: 'Chocotorta en vaso',
    price: 1300,
    image: 'https://media.mdzol.com/p/5f57b7471b11d365f42e34c9eb9f7b24/adjuntos/373/imagenes/001/342/0001342456/1200x675/smart/chocotorta-en-vasojpg.jpg',
    category: 'chocolates',
    description: 'Versión individual de la clásica chocotorta.',
    rating: 4.9,
    reviews: 94,
    stock: 22
  },{
    id: 14,
    name: 'Mini torta de chocolate',
    price: 1600,
    image: 'https://luciapaula.com/wp-content/uploads/2023/01/Blog-1970-01-20-125839033.jpg',
    category: 'tortas',
    description: 'Mini tortas individuales de chocolate con ganache.',
    rating: 4.8,
    reviews: 58,
    stock: 15
  },
  {
    id: 15,
    name: 'Torta selva negra',
    price: 2200,
    image: 'https://comedera.com/wp-content/uploads/sites/9/2022/09/shutterstock_1666023019.jpg',
    category: 'tortas',
    description: 'Clásica selva negra con crema chantilly y cerezas.',
    rating: 4.9,
    reviews: 72,
    stock: 10
  },
  // Galletas
  {
    id: 16,
    name: 'Galletas de avena y pasas',
    price: 700,
    image: 'https://assets.elgourmet.com/wp-content/uploads/2023/03/cooki_lg91oLQjnwTD8XNvRqYI2MEdO34xct.png',
    category: 'galletas',
    description: 'Galletas caseras de avena con pasas, saludables y sabrosas.',
    rating: 4.7,
    reviews: 34,
    stock: 25
  },
  {
    id: 17,
    name: 'Galletas de limón glaseadas',
    price: 800,
    image: 'https://www.cocinavital.mx/wp-content/uploads/2020/08/galletas-de-limon-glaseadas.jpg',
    category: 'galletas',
    description: 'Galletas crujientes de limón con glaseado dulce.',
    rating: 4.6,
    reviews: 29,
    stock: 20
  },
  // Budines
  {
    id: 18,
    name: 'Budín de banana y nuez',
    price: 900,
    image: 'https://m.ftscrt.com/static/recipe/9a63a850-219e-495c-83b1-0d7362ec1cbd_fs2.jpg',
    category: 'budines',
    description: 'Budín húmedo de banana con trozos de nuez.',
    rating: 4.8,
    reviews: 41,
    stock: 18
  },
  // Alfajores
  {
    id: 20,
    name: 'Alfajores de chocolate',
    price: 1000,
    image: 'https://assets.elgourmet.com/wp-content/uploads/2023/03/cover_bpl03xf1vk_alfajores-marplatenses-juan-manuel-herrera-el-gourmet.jpg',
    category: 'alfajores',
    description: 'Alfajores de chocolate rellenos de dulce de leche.',
    rating: 4.9,
    reviews: 85,
    stock: 30
  },
  {
    id: 21,
    name: 'Alfajores de maicena cubiertos de chocolate',
    price: 950,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgP6S_oB2qZvjQcBcBtBH_F8pmfdWnzDRJvA&s',
    category: 'alfajores',
    description: 'Suaves alfajores de maicena con dulce de leche casero.',
    rating: 4.8,
    reviews: 60,
    stock: 28
  },
  // Chocolates
  {
    id: 22,
    name: 'Bombones venezolanos surtidos',
    price: 1500,
    image: 'https://media.elestimulo.com/uploads/2016/11/chocolate-002-bombones.jpg',
    category: 'chocolates',
    description: 'Caja de bombones surtidos gourmet.',
    rating: 4.9,
    reviews: 95,
    stock: 12
  },
  {
    id: 23,
    name: 'Barrita de chocolate con almendras',
    price: 650,
    image: 'https://truffle-assets.tastemadecontent.net/1t1bxm43v4e3_2OAahRFxOwi42KAU2q8CQe_barritas-de-chocolate-con-almendras_landscapeThumbnail_es.jpeg',
    category: 'chocolates',
    description: 'Barrita de chocolate semiamargo con crocante de almendras.',
    rating: 4.7,
    reviews: 50,
    stock: 40
  },
  // Caramelos
  {
    id: 24,
    name: 'Caramelos Morita',
    price: 300,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMvMtlbUwZdNKtKl7vAY14T3Wx0nY-A2a6Tj3mVrehgT4UIsxJaXJunT9DF4gM42YeFxY&usqp=CAU',
    category: 'caramelos',
    description: 'Los famosos caramelos dulce y tropicales morita',
    rating: 4.5,
    reviews: 22,
    stock: 50
  },
  {
    id: 25,
    name: 'Caramelos de dulce de leche arcor',
    price: 350,
    image: 'https://clickandfoods.com/cdn/shop/products/128142-01_arcor-chocolate-butter-toffee-chewy-candy-1lb-bag_1200x1200.jpg?v=1600153863',
    category: 'caramelos',
    description: 'Caramelos blanditos sabor dulce de leche de la marca arcor.',
    rating: 4.6,
    reviews: 27,
    stock: 45
  }
];

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'cart' | 'auth' | 'checkout' | 'admin'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [authMessage, setAuthMessage] = useState('');
  const [loginFromCart, setLoginFromCart] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleProductsUpdate = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  // ✅ useEffect para redirigir a checkout automáticamente luego de iniciar sesión desde carrito
  useEffect(() => {
    if (user && loginFromCart) {
      setCurrentView('checkout');
      setLoginFromCart(false);
      setAuthMessage('');
    }
  }, [user, loginFromCart]);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItems={totalItems}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onHomeClick={() => setCurrentView('home')}
        onCartClick={() => setCurrentView('cart')}
        onProfileClick={() => setCurrentView('auth')}
        user={user}
      />

      {currentView === 'home' && (
        <>
          <Hero />
          <ProductGrid 
            products={filteredProducts}
            onProductClick={(product) => {
              setSelectedProduct(product);
              setCurrentView('product');
            }}
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </>
      )}

      {currentView === 'product' && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onBack={() => setCurrentView('home')}
        />
      )}

      {currentView === 'cart' && (
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onCheckout={() => {
            if (!user) {
              setAuthMessage('Debes iniciar sesión para continuar con la compra');
              setLoginFromCart(true);
              setCurrentView('auth');
            } else {
              setCurrentView('checkout');
            }
          }}
          onBack={() => setCurrentView('home')}
        />
      )}

      {currentView === 'auth' && (
        <Auth
          user={user}
          onLogin={(loggedUser) => {
  setUser(loggedUser);

  // Redirige inmediatamente si venía del carrito
  if (loginFromCart) {
    setCurrentView('checkout');
    setLoginFromCart(false);
    setAuthMessage('');
  } else {
    setCurrentView('home');
  }
}}

          onLogout={() => setUser(null)}
          onBack={() => {
            setCurrentView('home');
            setLoginFromCart(false);
            setAuthMessage('');
          }}
          onAdminAccess={() => setCurrentView('admin')}
          message={authMessage}
        />
      )}

      {currentView === 'checkout' && (
        <Checkout
          items={cartItems}
          onBack={() => setCurrentView('cart')}
          onComplete={() => {
            setCartItems([]);
            setCurrentView('home');
          }}
        />
      )}

      {currentView === 'admin' && (
        <Admin
          products={products}
          onBack={() => setCurrentView('home')}
          onProductsUpdate={handleProductsUpdate}
        />
      )}
    </div>
  );
}

export default App;
