const Commentmodel = require('../models/Comments.js');
const Postmodel= require('../models/Sweets.js');
const Usermodel = require('../models/User.js');
const fs= require('fs');
const path= require('path');

const Dashboard=async(req, res) =>{
    try {
        const Posts= await Blgomodel.find();
        const Users= await Usermodel.find();
        const comments= await Commentmodel.find();

        if (!Users && !Posts && !comments) {
            return res.status(404).json({success:false,message:"Not Data Found"})
        }

        res.status(200).json({success:true,Users,Posts,comments})

    } catch (error) {
        console.error("Delete Error:", error); 
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

const GetUsers=async(req,res)=>{
    try {
        const Users= await Usermodel.find();
        if (!Users) {
            res.status(404).json({success:false,message:"No Data Found"})
        }
        res.status(200).json({success:true,Users})
    } catch (error) {
        console.error("Delete Error:", error); 
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

const Delete= async(req, res) =>{
    try {
        const userId= req.params.id;
        const ExistUser=await Usermodel.findById(userId);

        if (ExistUser.role == 'admin') {
            return res.status(404).json({success:false,message:"Soory Your Admin You Can't Delete You Account"});  
         }

         if (ExistUser.profile) {
            const profilePath = path.join('public/images', ExistUser.profile);
            fs.promises.unlink(profilePath)
                .then(() => console.log('Profile image deleted'))
                .catch(err => console.error('Error deleting profile image:', err));
        }

        const DeleteUser= await Usermodel.findByIdAndDelete(userId);
        res.status(200).json({success:true,message:"user Deleted Successfully",User:DeleteUser});
    } catch (error) {
        console.error("Delete Error:", error); 
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}
module.exports= {Dashboard, GetUsers, Delete};