import React from 'react'
import { useState } from "react";
import "./Home.css";
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <>
    <div className='bg-gradient-to-br from-sky-100 to-pink-100'>
      {/* Hero Text */}
      <div className="text-center text-5xl py-3">
        <b>"Fresh. Delicious.<br /> Delivered to Your Door!" 🍫</b>
      </div>

      {/* Background Image */}
      <div className="px-3 py-5">
        <NavLink to='/products'>
        <img
          src="/background1.jpg"
          className="w-full h-[450px] object-cover rounded-lg"
          alt="SweetMart Background"
        />
        </NavLink>
      </div>

      {/* Videos */}
      <div className="px-2 overflow-hidden w-full">
        <div className="flex scroll-marquee">
        <video 
          width="600" height="400"
          src="/Home ani/8811354-hd_1920_1080_25fps.mp4"
          className="rounded"
          autoPlay
          loop
          muted
          disablePictureInPicture
        ></video>
        <video
          src="/Home ani/istockphoto-1915681892-640_adpp_is.mp4"
          width="600" height="400"
          className="rounded"
          autoPlay
          loop
          muted
          disablePictureInPicture
        ></video>
        <video
          src="/Home ani/istockphoto-2166427410-640_adpp_is.mp4"
          width="600" height="400"
          className="rounded"
          autoPlay
          loop
          muted
          disablePictureInPicture
        ></video>
        <video 
          width="600" height="400"
          src="/Home ani/8811354-hd_1920_1080_25fps.mp4"
          className="rounded"
          autoPlay
          loop
          muted
          disablePictureInPicture
        ></video>
        
      </div>
      </div>

      {/* Footer */}
      <footer className="bg-pink-100 text-gray-700 py-6 mt-10">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          {/* Branding */}
          <h2 className="text-2xl font-bold text-pink-600">SweetMart 🍭</h2>
          <p className="text-sm">Serving happiness since 2020</p>

          {/* Footer Navigation */}
          <div className="text-sm">
            <NavLink to='/' className="hover:text-pink-600">Home</NavLink>
            <span className="mx-2 text-gray-400">|</span>
            <NavLink to='/products' className="hover:text-pink-600">Products</NavLink>
            <span className="mx-2 text-gray-400">|</span>
            <NavLink to='/about' className="hover:text-pink-600">About</NavLink>
            <span className="mx-2 text-gray-400">|</span>
            <NavLink to='/contact' className="hover:text-pink-600">Contact</NavLink>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 mt-2">
            © 2025 SweetMart. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </>
  )
}

export default Home
