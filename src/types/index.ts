export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}