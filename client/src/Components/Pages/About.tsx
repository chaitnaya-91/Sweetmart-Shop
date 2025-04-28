import React, { useState } from 'react';

const About = () => {
  const [showTeam, setShowTeam] = useState(false);

  return (
    <>
    <div className='bg-gradient-to-br from-sky-100 to-pink-100'>
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">About CV SweetMart</h2>

      {/* Shop Introduction */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Welcome!</h3>
        <p>
          Welcome to <strong>CV SweetMart</strong>! We are passionate about bringing the sweetest moments to your life with delicious, homemade sweets crafted with love and tradition.
        </p>
      </section>

      {/* Founding Story */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Our Story</h3>
        <p>
          Founded in <strong>2020</strong> by <strong>Chaitanya Gaikwad</strong> and <strong>Vishal Gaikwad</strong>, SweetMart began as a small family-run sweet shop in Nandurkhi. Our journey started with a handful of recipes passed down through generations.
        </p>
      </section>

      {/* What Makes You Special */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
        <ul className="list-disc list-inside">
          <li>Authentic homemade recipes</li>
          <li>High-quality natural ingredients</li>
          <li>Blend of tradition and modern taste</li>
          <li>Prepared with love and hygiene</li>
        </ul>
      </section>

      {/* Team Section (Collapsible) */}
      <section className="mb-6">
        <h3
          className="text-xl font-semibold mb-2 cursor-pointer text-sky-500 hover:underline"
          onClick={() => setShowTeam(!showTeam)}
        >
          Meet Our Team {showTeam ? '▲' : '▼'}
        </h3>
        {showTeam && (
          <p>
            Our dedicated team includes passionate chefs, helpers, and family members who believe in the joy of sharing sweets made with heart and heritage.
          </p>
        )}
      </section>

      {/* Mission / Vision */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
        <p>
          Our mission is to spread joy through authentic sweets and build lasting memories for our customers with every bite.
        </p>
      </section>

      {/* Optional Images Section */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <img src="/download (1).jpeg" alt="Shop Front" className="rounded w-68 h-68 shadow-md" />
          <img src="/images (1).jpeg" alt="Homemade Sweets" className="rounded w-68 h-68 shadow-md" />
        </div>
      </section>
    </div>
    </div>
    </>
  );
};

export default About;
