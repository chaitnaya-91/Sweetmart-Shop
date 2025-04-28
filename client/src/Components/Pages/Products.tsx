import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, get, post } from '../../Services/Endpoint';

interface Sweet {
  _id: string;
  title: string;
  price: number;
  image: string;
}

interface ProductsProps {
  isLoggedIn: boolean;
}

const Products: React.FC<ProductsProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [sweets, setSweets] = useState<Sweet[]>([]);

  // Navigate to sweet detail page
  const handleRead = (id) => {
    navigate(`/products/post/${id}`);
  };

  // Navigate to cart page
  const handleAddToCart = () => {
    navigate('/cart');
  };

  // Handle Razorpay Payment
  const handleBuy = async (amount: number) => {
    try {
      const { data: keyData } = await get('/payments/getkey');
      const { data: orderData } = await post('/payments/process', { amount });

      const options = {
        key: keyData.key,
        amount: amount,
        currency: 'INR',
        name: 'SweetMart',
        description: 'Purchase Sweet',
        order_id: orderData.order.id,
        callback_url: 'http://localhost:3000/payment-success',
        prefill: {
          name: 'Chaitanya Gaikwad',
          email: 'chaitanyagaikwad91@example.com',
          contact: '8855030817',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  // Fetch sweets from backend
  const fetchSweets = async () => {
    try {
      const response = await get('/sweets/getdata');
      const data = response.data;
      setSweets(data.Sweets);
    } catch (error) {
      console.error('Error fetching sweets:', error);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-100 to-pink-100'>
    <div className="container mx-auto py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <div
            key={sweet._id}
            className="bg-white rounded shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={`${BaseUrl}/images/${sweet.image}`}
              alt={sweet.title}
              onClick={() => handleRead(sweet._id)}
              className="rounded-md mb-3 w-full h-80 object-cover cursor-pointer"
            />
            <h5 className="text-center bg-green-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-green-600 transition">
              {sweet.title}
            </h5>
            <p className='text-center bg-pink-100 my-2 rounded-md'>
            {sweet.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition"
              >
               Add to Cart
              </button>
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    handleBuy(sweet.price);
                  } else {
                    alert('Please login to make a purchase');
                    navigate('/sign-in');
                  }
                }}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
              >
                ₹ {sweet.price}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Products;
