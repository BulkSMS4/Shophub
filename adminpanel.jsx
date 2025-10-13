import React, { useState, useEffect } from "react";

export default function AdminPanel({ onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [products, setProducts] = useState([]);

  // Load existing products
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  const addProduct = (e) => {
    e.preventDefault();
    if (!name || !price || !img) return alert("Please fill all fields");

    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      img,
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    setName("");
    setPrice("");
    setImg("");
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-center mb-4">🛠️ Admin Panel</h2>

        <form onSubmit={addProduct} className="space-y-3 mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price (USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded font-semibold"
          >
            Add Product
          </button>
        </form>

        <h3 className="font-bold mb-2">🧾 Current Products</h3>
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center border-b pb-1"
            >
              <span>{p.name} (${p.price})</span>
              <button
                className="text-red-500 font-bold"
                onClick={() => deleteProduct(p.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-500 underline text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
