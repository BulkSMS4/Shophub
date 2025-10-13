import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function AuthForms({ onClose }) {
  const { register, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = isLogin
      ? login(email, password)
      : register(name, email, password);
    if (success && onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-80 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded p-2"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded p-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded p-2"
          />
          <button className="bg-orange-500 text-white py-2 rounded">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p
          className="text-center mt-3 text-blue-600 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New here? Create an account"
            : "Already have an account? Login"}
        </p>
        <button
          onClick={onClose}
          className="text-gray-500 underline mt-2 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}
