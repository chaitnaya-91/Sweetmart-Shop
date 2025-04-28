import React, { useState } from 'react';

const allServices = [
  {
    title: "Custom Orders",
    description: "Order personalized sweets for birthdays, weddings, and special occasions.",
    icon: "🎂",
  },
  {
    title: "Event Catering",
    description: "We provide bulk sweets and desserts for events with beautiful packaging.",
    icon: "🍬",
  },
  {
    title: "Home Delivery",
    description: "Get your favorite sweets delivered fresh to your doorstep.",
    icon: "🚚",
  },
  {
    title: "Festival Specials",
    description: "Celebrate every festival with our specially curated sweet boxes.",
    icon: "🎉",
  },
  {
    title: "Corporate Gifting",
    description: "Send thoughtful sweet gifts to your clients and employees.",
    icon: "🎁",
  },
  {
    title: "In-Store Pickup",
    description: "Order online and pick up your sweets conveniently from our CV Shop.",
    icon: "🏪",
  },
];

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? allServices : allServices.slice(0, 3);

  return (
    <div className="p-3 md:p-12 min-h-screen bg-gradient-to-br from-sky-100 to-pink-100">
      {/* Main Header */}
      <h2 className="text-3xl font-bold text-center mb-8 text-sky-600">
        Our Services at CV Shop
      </h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleServices.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-1 bg-gradient-to-r from-sky-500 to-pink-500 text-transparent bg-clip-text">
              {service.title}
            </h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {!showAll && (
        <div className="text-center mt-8">
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition"
            onClick={() => setShowAll(true)}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
