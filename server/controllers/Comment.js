const Commentmodel= require("../models/Comments.js");
const Postmodel = require("../models/Sweets");
const Usermodel= require('../models/User.js');

const AddComment = async (req, res) => {
    try {
        const { postId, userId, comment } = req.body;

        if (!postId || !userId || !comment) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Create a new comment
        const newComment = new Commentmodel({
            postId,
            userId,
            comment
        });

        // Find the blog post and add the comment to it
        const sweetPost = await Postmodel.findById(postId)
        .populate("comments") // only include relevant fields
        // optional: info about the sweet post
        .sort({ createdAt: -1 }); // latest comment first;
        if (!sweetPost) {
            return res.status(404).json({ success: false, message: 'Sweet post not found' });
        }

        sweetPost.comments.push(newComment._id);
        await sweetPost.save();
        await newComment.save();

        res.status(201).json({ success: true, message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const ViewComments = async (req, res) => {
    try {
        const { postId } = req.params;  // Access postId from URL parameters
        console.log("Received postId:", postId);  // Log the postId to debug

        // Fetch the post with the given postId
        const sweetPost = await Postmodel.findById(postId);

        console.log("Found Sweet Post:", sweetPost);  // Log the post to check if it's found

        if (!sweetPost) {
            return res.status(404).json({ success: false, message: 'Sweet post not found' });
        }

        // Fetch comments for the specific post (no population)
        const comments = await Commentmodel.find({ postId });

        console.log("Found Comments:", comments);  // Log the fetched comments

        if (comments.length === 0) {
            return res.status(404).json({ success: false, message: 'No comments found for this post' });
        }

        // Manually fetching user details for each comment (without populate)
        for (let comment of comments) {
            const user = await Usermodel.findById(comment.userId);
            comment.userDetails = user ? { Fullname: user.Fullname, Email: user.Email, profile: user.profile } : null;
        }

        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error("Error in ViewComments:", error.message || error);  // Log the error message clearly
        res.status(500).json({ success: false, message: "Internal server error", error: error.message || error });
    }
};



module.exports= {AddComment, ViewComments}