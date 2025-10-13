import React, { useState } from "react";
import { CartProvider, useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";
import { AuthProvider, useAuth } from "./AuthContext";
import AuthForms from "./AuthForms";

const products = [
  { id: 1, name: "Smartphone X", price: 499, img: "https://via.placeholder.com/200" },
  { id: 2, name: "Wireless Headphones", price: 79, img: "https://via.placeholder.com/200" },
  { id: 3, name: "Men’s Sneakers", price: 59, img: "https://via.placeholder.com/200" },
];

function ProductList() {
  const { addToCart } = useCart();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map((p) => (
        <div key={p.id} className="bg-white p-3 shadow rounded text-center">
          <img src={p.img} alt={p.name} className="w-full h-40 object-cover rounded" />
          <h3 className="mt-2 font-semibold">{p.name}</h3>
          <p className="text-orange-500 font-bold">${p.price}</p>
          <button
            className="mt-2 bg-orange-500 text-white px-4 py-1 rounded"
            onClick={() => addToCart(p)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">ShopHub</h1>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <button
                className="bg-white text-orange-600 px-3 py-1 rounded"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="bg-white text-orange-600 px-3 py-1 rounded"
              onClick={() => setAuthOpen(true)}
            >
              Login / Register
            </button>
          )}

          <button
            className="bg-white text-orange-600 px-3 py-1 rounded"
            onClick={() => setCartOpen(true)}
          >
            Cart
          </button>
        </div>
      </header>

      <ProductList />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      {authOpen && <AuthForms onClose={() => setAuthOpen(false)} />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
