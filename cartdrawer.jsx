import React from "react";
import { useCart } from "./CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, total, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-80 p-4 overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>${item.price} × {item.quantity}</p>
                </div>
                <button
                  className="text-red-500 font-bold"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="mt-4 font-bold text-lg">
              Total: ${total.toFixed(2)}
            </div>

            <button
  className="bg-green-600 text-white w-full py-2 mt-4 rounded"
  onClick={() => {
    // 👉 Replace this with your actual payment link
    const paymentLink = "https://www.cuttifree.com.ng?user=918&ref=15845";
    
    window.open(paymentLink, "_blank");
  }}
>
  Proceed to Payment
</button>
          </>
        )}

        <button
          className="mt-4 text-gray-500 underline w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
