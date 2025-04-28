import React, { useEffect, useState } from 'react';
import { get, post } from '../../Services/Endpoint';

interface Sweet {
  _id: string;
  name: string;
  price: number;
}

const Buy = () => {
  const [quantity, setQuantity] = useState(1);
  const [sweet, setSweet] = useState<Sweet | null>(null);

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const fetchSweet = async () => {
    try {
      const response = await get('/sweets/getdata');
      const data = response.data;
      if (data.Sweets && data.Sweets.length > 0) {
        setSweet(data.Sweets[0]); // Just the first sweet
        console.log('Selected Sweet:', data.Sweets[0]);
      }
    } catch (error) {
      console.error('Error fetching sweet:', error);
    }
  };

  const handleBuyNow = async () => {
    if (!sweet) return;

    const totalAmount = sweet.price * quantity; // Razorpay expects paise

    try {
      const response1 = await get('/payments/getkey');
      const response2 = await post('/payments/process', { amount: totalAmount });

      const { key } = response1.data;
      const { order } = response2.data;

      const options = {
        key: key,
        amount: totalAmount,
        currency: 'INR',
        name: 'SweetMart',
        description: `Buying ${sweet.name}`,
        order_id: order.id,
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
      console.error('Error processing payment:', error);
    }
  };

  useEffect(() => {
    fetchSweet();
  }, []);

  if (!sweet) return <p className="text-center mt-10">Loading sweet...</p>;

  const totalPrice = sweet.price * quantity;

  return (
    <div className="p-6 max-w-sm mx-auto border rounded-xl mt-32 shadow-lg text-center bg-white">
      <h2 className="text-2xl font-bold mb-4">{sweet.name}</h2>
      <p className="text-lg mb-2">Price per item: ₹{sweet.price}</p>

      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          onClick={decreaseQty}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <span className="text-xl font-medium">{quantity}</span>
        <button
          onClick={increaseQty}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>

      <p className="text-lg font-semibold mb-4">Total Price: ₹{totalPrice}</p>

      <button
        onClick={handleBuyNow}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Buy Now
      </button>
    </div>
  );
};

export default Buy;
