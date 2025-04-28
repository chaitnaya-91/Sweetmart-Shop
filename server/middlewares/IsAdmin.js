const jwt= require('jsonwebtoken');
const Usermodel = require('../models/User');

const IsAdmin =async(req, res, next) =>{
    try {
        const token= req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "unauthorized: no token" });
        }
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const user= await Usermodel.findById(decoded.userId);
        // console.log(user);

        if (!user) {
            return res.status(403).json({ success: false, message: "unauthorized: user not found" });
        }

        if (user.role != 'admin') {
            return res.status(403).json({ success: false, message: "unauthorized: user not admin" });
        }

        next();
    } catch (error) {
        console.error("Admin Error:", error); 
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports= IsAdmin;