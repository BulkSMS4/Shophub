import React, { useState } from "react";
import { useProducts } from "./ProductContext";
import { useAuth } from "./AuthContext";

export default function AdminPanel({ onClose }) {
  const { products, addProduct, deleteProduct, updateProduct } = useProducts();
  const { user } = useAuth();

  // Only allow admin (you can change this email or set a special password check)
  if (!user || user.email !== "admin@shophub.com") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow w-80 text-center">
          <h2 className="text-lg font-bold mb-2">Access Denied</h2>
          <p>You must be logged in as admin@shophub.com</p>
          <button onClick={onClose} className="mt-3 underline">Close</button>
        </div>
      </div>
    );
  }

  const [form, setForm] = useState({ name: "", price: "", img: "", category: "" });
  const [editId, setEditId] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, img: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateProduct({ ...form, id: editId });
      setEditId(null);
    } else {
      addProduct({ ...form, price: Number(form.price) });
    }
    setForm({ name: "", price: "", img: "", category: "" });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded shadow w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">🧰 Admin Panel</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 rounded"
          />
          <input type="file" onChange={handleImage} className="border p-2 rounded" />
          {form.img && <img src={form.img} alt="preview" className="w-20 h-20 object-cover" />}
          <button className="bg-green-600 text-white py-2 rounded col-span-full">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>

        <h3 className="text-lg font-bold mb-2">Existing Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border rounded p-2 text-center">
              <img src={p.img} alt={p.name} className="w-full h-32 object-cover rounded" />
              <h4 className="font-semibold mt-1">{p.name}</h4>
              <p>${p.price}</p>
              <div className="flex justify-center gap-2 mt-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="mt-4 w-full text-gray-600 underline">
          Close Panel
        </button>
      </div>
    </div>
  );
}
