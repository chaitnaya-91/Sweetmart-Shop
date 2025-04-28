import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseUrl, get } from '../../Services/Endpoint';
import axios from 'axios';

const Post = () => {
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [comments, setComments] = useState([]); // List of all comments
  const [singlepost, setsinglepost] = useState(null);
  const [users, setUsers] =useState('');
  const [sweets, setSweets]= useState('');

  const { id } = useParams();

  // Fetch post data
  const SinglePost = async () => {
    try {
      const response = await get(`/public/getpost/${id}`);
      console.log('Response:', response);  // Log the response for debugging
      const data = response.data;
      setsinglepost(data.Post);
      setComments(data.Post.comments || []); 
      
      const response2 = await get('/dashboard/users');
      const data2 = response2.data;
      setUsers(data2.Users);

      const response3 = await get('/sweets/getdata');
      const data3 = response.data;
      setSweets(data3.Sweets);

      console.log('users',data2);
      console.log('sweets',data3);

    } 
    catch (error) {
      console.error('Error fetching post:', error);
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    SinglePost();
  }, [id]); // Adding id to dependency array so it refetches when id changes

  // Handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim().length < 3) {
      alert('Please write a valid comment.');
      return;
    }

    // Get user from localStorage (assuming it's stored there after login)
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      alert('You must be logged in to comment.');
      return;
    }

    const commentPayload = {
      postId: id,
      userId: user._id,
      comment: comment
    };

    try {
      await axios.post('http://localhost:4000/comments/addcomment', commentPayload);

      // Optionally add the comment locally too (optimistic update)
      const newComment = {
        id: Date.now(),
        name: user.name || 'Chaitanya',
        text: comment,
        profilePic: user.profilePic || '/default-profile.jpg',
        email: user.email || 'no-email@domain.com' // Assuming you store user's email in localStorage
      };

      setComments([newComment, ...comments]);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment.');
    }
  };

  if (!singlepost) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  return (
    <div className='container mx-auto py-5'>
      <div className='bg-white rounded shadow-md p-6 hover:shadow-lg'>
        <h5 className='text-center font-bold text-4xl mb-4'>{singlepost.title}</h5>
        <img
          src={singlepost.image ? `${BaseUrl}/images/${singlepost.image}` : '/background1.jpg'}
          alt='sweet'
          className='rounded-md mb-3 w-full h-[400px] object-cover'
        />
        <p className='min-h-[100px] bg-green-100 p-4 rounded-md text-gray-700 text-center'>
          {singlepost.desc}
        </p>
        <hr className='my-4' />

        <h3 className='font-bold text-2xl mb-2'>Leave A Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor='comment' className='block mb-1 font-medium'>Your Comment</label>
            <textarea
              className='w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-sky-400'
              id='comment'
              rows='2'
              placeholder='Write your comment here...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type='submit'
            className='bg-sky-500 text-white px-5 py-2 rounded hover:bg-sky-600 transition-colors'
          >
            Submit Comment
          </button>
          {submitted && (
            <p className="text-green-600 font-medium mt-2">✅ Comment submitted successfully!</p>
          )}
        </form>

        <hr className='my-6' />

        <h3 className='text-xl font-semibold mb-3'>Comments</h3>
        <div className='space-y-4'>
          {comments.length === 0 && <p className="text-gray-500">No comments yet. Be the first to share!</p>}
         
          {comments.map((item, index) => (
  <div key={index} className='flex items-start gap-4 border-b pb-3'>
    <img
      src={item.profilePic || '/add-new-user_78370-4710.jpg'}
      alt='profile'
      className='h-10 w-10 rounded-full border'
    />
    <div>
      <h5 className='font-bold'>{item.userId || 'Anonymous'}</h5>
      <p className='text-gray-700'>{item.comment}</p>
    </div>
  </div>
))}

          
        </div>
      </div>
    </div>
  );
};

export default Post;
