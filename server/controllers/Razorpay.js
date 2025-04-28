const instance = require("../Razorpay.js");

const Payments = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: 'INR',
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const Getkey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_API_ID,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {Payments, Getkey};
