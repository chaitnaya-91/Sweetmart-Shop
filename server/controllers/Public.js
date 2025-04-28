const Postmodel = require("../models/Sweets.js");

const GetSinglePost=async(req,res)=>{
    try {
        const postId=req.params.id

        const Post= await Postmodel.findById(postId).populate('comments');

        if (!Post) {
            return res.status(404).json({ success: false, message: 'Sweet post not found' });

        }
        res.status(200).json({success:true,Post})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {GetSinglePost}