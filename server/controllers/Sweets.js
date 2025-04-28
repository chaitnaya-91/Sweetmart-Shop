const Postmodel = require("../models/Sweets");
const fs= require('fs');
//fs (File System module): Allows you to work with the file system on your machine. 
// You can read, write, delete files, etc.
const path= require('path');
//path module: Helps you safely create and work with file paths
//  (useful across different OS like Windows/Linux).


const Create= async(req,res) =>{
    try {
        let {title ,desc, price}=req.body;
        price = parseFloat(price);

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }

        const imagePath= req.file ? req.file.filename : null;

        const Createpost= new Postmodel({
            title, desc,price, image:imagePath
        });

        await Createpost.save();
         return res.status(201).json({success:true, message:'Post Created', sweet:Createpost});
         
    } catch (error) {
        console.error("Create Error:", error); 
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

const Delete=async(req,res) =>{
    // after delete admin post it will should delete from database also(image)
    try {
        const postId= req.params.id;
        const findPost= await Postmodel.findById(postId);
        if (!findPost) {
            return res.status(404).json({ success: false, message: "post not found" });
        }
        const deletedPost= await Postmodel.findByIdAndDelete(postId);
        return res.status(201).json({success:true, message:'Post deleted', sweet:deletedPost})

    } catch (error) {
        console.error("Delete Error:", error); 
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

const Update= async(req,res) =>{
    try {
        const { title, desc, price } = req.body;
        
        const blogId = req.params.id;
        const Updatepost = await Postmodel.findById(blogId);
        if (!Updatepost) {
            return res.status(404).json({ success: false, message: 'Sweet not found' });
        }
        if (title) Updatepost.title = title;
        if (desc) Updatepost.desc = desc;
        if (price) Updatepost.price = price;
        if (req.file) Updatepost.image = req.file.filename;

        await Updatepost.save();
        //Wait for this save operation to finish. Only then, move to the next line
        res.status(200).json({ success: true, message: 'Post updated successfully', sweets: Updatepost });
    } catch (error) {
        console.error("Delete Error:", error); 
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

const Getposts=async(req,res) =>{
    try {
        const posts= await Postmodel.find().populate("comments");;
        if (!posts) {
            return res.status(404).json({ success: false, message: 'post not found' });
        }
        res.status(200).json({ success: true,  Sweets:posts });
    } catch (error) {
        console.error("Delete Error:", error); 
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}
module.exports= {Create, Delete, Update, Getposts};
