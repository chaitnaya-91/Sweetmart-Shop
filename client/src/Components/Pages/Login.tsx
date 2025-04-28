import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export const Login = ({ setIsLogin, setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        Email: email,
        Password: password,
      });
  
      if (res.status === 200) {
        alert("Login successful!");
        console.log(res.data);
  
        setIsLogin(true);
  
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(res.data.user));
  
        // Optional: Set isAdmin based on backend response
        if (res.data.user && res.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
      setIsLogin(false);
      setIsAdmin(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">CV SweetMart 🍬</h2>
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">Login to your account</h3>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-sky-500 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white font-semibold py-2 rounded-lg hover:bg-sky-600 transition duration-200"
          >
            Login
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Don’t have an account? <NavLink to="/sign-up" className="text-pink-500 hover:underline">Sign up</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
