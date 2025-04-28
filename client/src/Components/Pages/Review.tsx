import React, { useEffect, useState } from 'react';
import { get, post } from '../../Services/Endpoint';

interface Sweet {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const SweetCart = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);

  const fetchSweets = async () => {
    try {
      const response = await get('/sweets/getdata');
      const data = response.data;

      if (data?.Sweets && data.Sweets.length > 0) {
        const sweetsWithQty = data.Sweets.map((sweet: any) => ({
          ...sweet,
          quantity: 0,
        }));
        setSweets(sweetsWithQty);
      }
    } catch (error) {
      console.error('Error fetching sweets:', error);
    }
  };

  const handleQtyChange = (index: number, delta: number) => {
    setSweets(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
          : item
      )
    );
  };

  const handleBuyAll = async () => {
    const selectedItems = sweets.filter(sweet => sweet.quantity > 0);

    if (selectedItems.length === 0) {
      return alert('Please select quantity for at least one sweet');
    }

    const totalAmount = selectedItems.reduce(
      (sum, sweet) => sum + sweet.price * sweet.quantity,
      0
    );

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
        description: `Buying ${selectedItems.length} sweet(s)`,
        order_id: order.id,
        callback_url: 'http://localhost:3000/payment-success',
        prefill: {
          name: 'Chaitanya Gaikwad',
          email: 'chaitanya@example.com',
          contact: '9999999999',
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
    fetchSweets();
  }, []);

  if (sweets.length === 0) {
    return <p className="text-center mt-10">Loading sweet...</p>;
  }

  const overallTotal = sweets.reduce(
    (sum, sweet) => sum + sweet.quantity * sweet.price,
    0
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-100 to-pink-100'>
    <div className="container mx-auto py-5 ">
      <h2 className="text-2xl font-bold mb-6 text-center text-sky-600">🍬 All Sweets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-green-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Sweet</th>
              <th className="py-3 px-4 border-b">Price (₹)</th>
              <th className="py-3 px-4 border-b">Quantity</th>
              <th className="py-3 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map((sweet, index) => (
              <tr
                key={sweet._id}
                className="text-center hover:bg-sky-100 transition duration-200"
              >
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{sweet.title}</td>
                <td className="py-2 px-4 border-b">{sweet.price}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleQtyChange(index, -1)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{sweet.quantity}</span>
                    <button
                      onClick={() => handleQtyChange(index, 1)}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  ₹{sweet.quantity * sweet.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-between items-center px-4">
          <h3 className="text-xl font-semibold text-green-700">
            Total Amount: ₹{overallTotal}
          </h3>
          <button
            onClick={handleBuyAll}
            className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Buy All
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SweetCart;
