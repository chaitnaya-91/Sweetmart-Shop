import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import shopName from "/cv sweets.jpg";
import LogoutButton from './Pages/Logout';

const Header = ({ isLoggedIn , isAdmin, setIsLoggedIn }) => {
  
  const navigate = useNavigate();

  const handleadmin = () => {
    if (isAdmin) {
      navigate('/adminpage');
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto pt-2">
        <div className="w-full flex text-sky-400 items-center justify-between">

          {/* Logo and Home */}
          <div className="flex items-center gap-4">
            <img
              src={shopName}
              onClick={handleadmin}
              height="80px"
              width="80px"
              alt="SweetMart Logo"
              className="cursor-pointer"
            />
            <NavLink to="/" className="hover:text-blue-600 hover:bg-slate-100 px-2 py-1 rounded font-bold">
              Home
            </NavLink>
          </div>

          {/* Center Navigation */}
          <div className="flex gap-6 items-center">
            <NavLink to="/products" className="hover:text-blue-600 hover:bg-slate-100 px-2 py-1 rounded font-bold">
              Products
            </NavLink>
            <NavLink to="/sweetcart" className="hover:text-blue-600 hover:bg-slate-100 px-2 py-1 rounded font-bold">
            SweetCart
            </NavLink>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">

            {/* Search Bar */}
            <div className="flex items-center border-2 border-sky-300 rounded bg-sky-100 px-2">
              <ion-icon name="search" className="text-sky-500 mr-1"></ion-icon>
              <input
                type="text"
                placeholder="Search"
                name="search"
                className="text-center rounded bg-sky-100 outline-none"
              />
            </div>

            {/* Links */}
            <NavLink to="/about" className="hover:text-blue-600 hover:bg-slate-100 px-2 py-1 rounded font-bold">
              About
            </NavLink>
            <NavLink to="/services" className="hover:text-blue-600 hover:bg-slate-100 px-2 py-1 rounded font-bold">
              Services
            </NavLink>
            <NavLink to="/contact" className="hover:text-blue-600 hover:bg-slate-100 px-2 py-1 rounded font-bold">
              Contact
            </NavLink>

            {/* Auth/Profile Section */}
            {isLoggedIn ? (
              <div className="relative group">
                <img
                  src="/add-new-user_78370-4710.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-sky-500"
                />
                <ul className="absolute hidden group-hover:block bg-white shadow-md rounded-md min-w-32">
                  <li className="px-4 py-2 font-bold hover:bg-slate-100">
                    <NavLink to="/profile">My Profile</NavLink>
                  </li>
                  <li className="px-2 py-2 font-bold hover:bg-slate-100">
                    <LogoutButton setIsLoggedIn={setIsLoggedIn}/> {/* Use the LogoutButton component here */}
                  </li>
                </ul>
              </div>
            ) : (
              <div className="relative group cursor-pointer">
                <div>
                  <img
                    src="/add-new-user_78370-4710.jpg"
                    alt="myprofile"
                    className="w-14 h-14 rounded-full border-1 border-sky-500"
                  />
                </div>
                <ul className="absolute hidden group-hover:block bg-white shadow-md rounded-md min-w-24">
                  <li className="px-4 py-2 font-bold hover:bg-slate-100">
                    <NavLink to="/sign-in">Sign In</NavLink>
                  </li>
                  <li className="px-4 py-2 font-bold hover:bg-slate-100">
                    <NavLink to="/sign-up">Sign Up</NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className='mt-2' />
    </header>
  );
};

export default Header;
