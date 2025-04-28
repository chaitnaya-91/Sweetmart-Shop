import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Home from './Components/Pages/Home'; 
import Products from "./Components/Pages/Products";

import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Register from "./Components/Pages/Register";
import { Login } from "./Components/Pages/Login";
import Post from "./Components/Pages/Post";
import Buy from "./Components/Pages/Buy";
import Adminlayout from "./Components/Layouts/Adminlayout";
import Dashboard from "./Components/Layouts/Compo/Dashboard";
import Addsweet from "./Components/Layouts/Compo/Addsweet";
import Viewall from "./Components/Layouts/Compo/Viewall";
import Services from "./Components/Pages/Services";
import SweetCart from "./Components/Pages/Review";


const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <Router>
        <Header isLoggedIn={isLogin} isAdmin={isAdmin} setIsLoggedIn={setIsLogin}/>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products isLoggedIn={isLogin}/>} />
          <Route path='/sweetcart' element={<SweetCart />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign-in' element={<Login setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/products/post/:id' element={<Post />} />
          <Route path='/products/buy/:id' element={<Buy />} />
          <Route path='/adminpage' element={<Adminlayout />} />
          <Route path='/cart' element={<Buy />} />
          <Route path='/services' element={<Services />} />


        </Routes>
      </Router>
    </>
  );
};

export default App;
