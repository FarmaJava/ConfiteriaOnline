import React, { useState } from 'react';
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
    image: 'data:image/jpeg;base64,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',
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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
            onProductClick={handleProductClick}
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
          onCheckout={() => setCurrentView('checkout')}
          onBack={() => setCurrentView('home')}
        />
      )}

      {currentView === 'auth' && (
        <Auth
          user={user}
          onLogin={setUser}
          onLogout={() => setUser(null)}
          onBack={() => setCurrentView('home')}
          onAdminAccess={() => setCurrentView('admin')}
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