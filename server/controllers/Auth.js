const Usermodel = require("../models/User");
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');

const Register= async(req, res)=>{
    console.log("Create API called");
    try {
       const {Fullname, Email, Password}= req.body;
       const existuser= await Usermodel.findOne({Email});

       if(existuser){
        return res.status(303).json({success:false, message:'user already exist!'})
       }

       const imagePath= req.file ? req.file.filename : null;
       const hashpassword= await bcrypt.hashSync(Password ,10);
       
       const newuser= new Usermodel({
        Fullname,Email,Password:hashpassword,profile: imagePath
       })

       await newuser.save();
       return res.status(201).json({success:true, message:'registered successfully!'})
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:'internal server error'})
    }
}
const Login = async (req, res) => {
  try {
      const { Email, Password } = req.body;
      if (!Email || !Password) {
          return res.status(400).json({ success: false, message: "All fields are required" });
      }

      const findUser = await Usermodel.findOne({ Email });

      if (!findUser) {
          return res.status(400).json({ success: false, message: "No user found, please register first" });
      }

      const compPass = await bcrypt.compare(Password, findUser.Password);
      console.log("Password Match:", compPass);

      if (!compPass) {
          return res.status(400).json({ success: false, message: "Password doesn't match" });
      }

      // Generate JWT token with user info
      const token = jwt.sign({ userId: findUser._id, role: findUser.role }, process.env.JWT_SECRET);

      res.cookie('token', token, {
          httpOnly: true,
          secure: false,
          maxAge: 3 * 24 * 60 * 60 * 1000  // 3 days
      });

      // Send the user data and token including the role
      return res.status(200).json({
          success: true,
          message: "Login Successfully!",
          user: findUser,
          token,
          role: findUser.role  // Include role in the response
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}


const Logout= async (req,res) =>{
    try {
        res.clearCookie('token');
        return res.status(200).json({ success: true, message: "Logout Successfully! "});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Usermodel.findById(decoded.userId).select("-Password"); // exclude password
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      req.user = user; // attach user info to request object
      next();
    } catch (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
  };

module.exports = {Register, Login, Logout, verifyToken}; 