import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
    <div className='bg-gradient-to-br from-sky-100 to-pink-100'>
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
        Contact Us
      </h2>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <div>
          <label className="block text-md font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-md font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-md font-medium">Adress</label>
          <textarea
            name="message"
            placeholder='Post Your Adress Here !!'
            rows={4}
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-sky-500 text-white px-6 py-2 rounded hover:bg-sky-600"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="bg-gray-100 p-6 rounded shadow-md space-y-2">
        <p>
          <strong>📍 Address:</strong> Chaudhari Wasti, Kakadi Airport Road,
          Nandurkhi (423107)
        </p>
        <p>
          <strong>📞 Phone:</strong> +91-8855030817  ||  +91-9322609604
        </p>
        <p>
          <strong>✉️ Email:</strong> chaitanyagaikwad91@gmail.com ||  vishalkgaikwad2004@gmail.com
        </p>
        <p>
          <strong>🕒 Opening Hours:</strong> Open Daily: 10:00 AM – 9:00 PM
        </p>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-6 rounded overflow-hidden">
        <iframe
          title="SweetMart Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3754.7207677071965!2d74.4590269!3d19.7670148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc5ba7a0cd5471%3A0x13f04888a86e5209!2sNandurkhi%20Rd%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1744394811248!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    </div>
    </>
  );
};

export default Contact;
