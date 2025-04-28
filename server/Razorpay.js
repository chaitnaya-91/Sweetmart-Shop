
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_ID,
  key_secret: process.env.RAZORPAY_API_KEY,
});

module.exports = instance;