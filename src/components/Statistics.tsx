import React from "react";
import { ArrowLeft } from "lucide-react";
import { Product, CartItem, User} from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface StatisticsProps {
  onBack: () => void;
  products: Product[];
  cartItems: CartItem[];
  users: User[];
  visits: number;
}

const Statistics: React.FC<StatisticsProps> = ({
  onBack,
  products,
  cartItems,
}) => {
  // Datos de ejemplo si props vienen vacíos
  const exampleProducts = products.length
    ? products
    : [
        { name: "Palmeritas", price: 100, rating: 4.5 },
        { name: "Tarta de frutillas", price: 150, rating: 4.2 },
        { name: "Torta Chocolate", price: 200, rating: 4.8 },
        { name: "Torta de Oreo con Chocolate", price: 220, rating: 4.6 },
        { name: "Torta selva negra", price: 250, rating: 4.9 },
      ];

  const exampleCartItems = cartItems.length
    ? cartItems
    : [
        { product: exampleProducts[0], quantity: 3 },
        { product: exampleProducts[1], quantity: 5 },
        { product: exampleProducts[2], quantity: 2 },
        { product: exampleProducts[3], quantity: 4 },
        { product: exampleProducts[4], quantity: 1 },
      ];


  // Ejemplo de reviews


  // Total ventas
  const totalVentas = 219;

  // Ingresos
  const ingresos = exampleCartItems.reduce(
    (acc, item) => acc + (item.product.price || 0) * item.quantity,
    0
  );

  // Productos más vendidos
  const topProductos = exampleProducts.map((p, idx) => ({
    name: p.name,
    ventas: exampleCartItems[idx]?.quantity + Math.floor(Math.random() * 20) || 0,
  }))  .sort((a, b) => b.ventas - a.ventas) // opcional: ordenar de mayor a menor
  .slice(0, 5); // solo los 5 primeros

  // Productos agregados al carrito con valores de ejemplo para el gráfico
  const productosCarritoFiltrados = [
    { name: "Palmeritas", agregado: 8 },
    { name: "Tarta de frutillas", agregado: 5 },
    { name: "Torta Chocolate", agregado: 7 },
    { name: "Torta de Oreo con Chocolate", agregado: 6 },
    { name: "Torta selva negra", agregado: 4 },
  ];

  // Ratings promedio
  const ratings = exampleProducts.map((p) => ({
    name: p.name,
    rating: p.rating || 0,
  }));

  // Generar reseñas inventadas para todos los productos entre 18 y 25
  const reseñasPorProducto = [...exampleProducts]
    .map((p) => ({
      name: p.name,
      reseñas: Math.floor(Math.random() * 20)
    }))
    .sort((a, b) => b.reseñas - a.reseñas) // ordenar de mayor a menor
    .slice(0, 5); // solo los 5 productos con más reseñas

  // Conversión
  const conversion = 49.0;

  // Mejor y peor producto
  const mejorProducto = [...exampleProducts].sort(
    (a, b) => (b.rating || 0) - (a.rating || 0)
  )[0];
  const peorProducto = [...exampleProducts].sort(
    (a, b) => (a.rating || 0) - (b.rating || 0)
  )[0];

  const COLORS = ["#EB9898", "#D4F663", "#82ca9d", "#8884d8", "#ffc658"];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Botón Volver */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 hover:opacity-80 mb-6 transition-colors"
        style={{ color: "#EB9898" }}
      >
        <ArrowLeft className="h-5 w-5" />
        Volver
      </button>

      <h2 className="text-3xl font-bold mb-6 text-gray-800">📊 Estadísticas</h2>

      {/* Cards resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold text-gray-600">Ventas Totales</h3>
          <p className="text-2xl font-bold">{totalVentas}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold text-gray-600">Ingresos 💰</h3>
          <p style={{ color: "green" }} className="text-2xl font-bold">
            +${ingresos.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold text-gray-600">Usuarios</h3>
          <p className="text-2xl font-bold">{83}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold text-gray-600">Visitas</h3>
          <p className="text-2xl font-bold">{1428}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Productos más vendidos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProductos}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#EB9898" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Más agregados al carrito</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={productosCarritoFiltrados}
                dataKey="agregado"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {productosCarritoFiltrados.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Rating promedio ⭐</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ratings}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rating">
                {ratings.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Cantidad de reseñas</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={reseñasPorProducto}>
              <XAxis
                dataKey="name"
                angle={-30}       // rotar etiquetas
                textAnchor="end"  // alinear texto
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reseñas">
                {reseñasPorProducto.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversión y mejor/peor producto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="font-semibold text-gray-600">Conversión</h3>
          <p className="text-2xl font-bold">{conversion}%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="font-semibold text-gray-600">Mejor Producto</h3>
          <p className="font-bold">{mejorProducto.name}</p>
          <p>⭐ {mejorProducto.rating}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="font-semibold text-gray-600">Peor Producto</h3>
          <p className="font-bold">{peorProducto.name}</p>
          <p>⭐ {peorProducto.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
