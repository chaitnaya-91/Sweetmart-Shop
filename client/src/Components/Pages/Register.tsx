import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    Fullname: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("Fullname", formData.Fullname);
      data.append("Email", formData.Email);
      data.append("Password", formData.Password);
      data.append("confirmPassword", formData.confirmPassword);
      if (image) {
        data.append("profile", image); // This matches backend's req.file
      }

      const res = await axios.post("http://localhost:4000/auth/register", data);
      alert("User registered successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">SweetMart 🍬</h2>
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">Create your account</h3>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-600">Full Name</label>
            <input
              type="text"
              name="Fullname"
              onChange={handleInputChange}
              value={formData.Fullname}
              required
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              name="Email"
              onChange={handleInputChange}
              value={formData.Email}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="Password"
              onChange={handleInputChange}
              value={formData.Password}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleInputChange}
              value={formData.confirmPassword}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-600"
            />
            {image && (
              <p className="text-xs text-green-600 mt-1">Selected: {image.name}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition duration-200"
          >
            Register
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <NavLink to="/sign-in" className="text-sky-500 hover:underline">
              Login here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
