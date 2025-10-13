import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
    else {
      // Default demo products
      const defaultProducts = [
        { id: 1, name: "Smartphone X", price: 499, img: "https://via.placeholder.com/200", category: "Phones" },
        { id: 2, name: "Wireless Headphones", price: 79, img: "https://via.placeholder.com/200", category: "Electronics" },
        { id: 3, name: "Men’s Sneakers", price: 59, img: "https://via.placeholder.com/200", category: "Fashion" },
      ];
      setProducts(defaultProducts);
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    newProduct.id = Date.now();
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (updated) => {
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
