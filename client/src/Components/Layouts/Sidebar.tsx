import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTachometerAlt, FaPlusSquare, FaListAlt, FaEye, FaUsers } from "react-icons/fa";
import { BaseUrl, get } from '../../Services/Endpoint';

const Sidebar = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [activeSection, setActiveSection] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [editId, setEditId] = useState('');
  const [users, setUsers] = useState([]);
  const [sweetcount, setSweetcount] = useState('');
  const [usercount, setUsercount] = useState('');

  const handledashboard = async() =>{ 
    setActiveSection('dashboard');
    try {
      const response1 = await get('/sweets/getdata');
      const data1 = response1.data;
      const response2 = await get('/dashboard/users');
      const data2 = response2.data;

      setSweetcount(data1.Sweets.length);
      setUsercount(data2.Users.length);
      /* length can not set dynamcially hence use useEffect */
      console.log("Updated sweet count:", data1.Sweets.length);
      console.log('alls users',data2.Users.length);
    } catch (error) {
      console.error('Error fetching sweets:', error);
    }
  }
  useEffect(() => {
    console.log("Updated sweet count:", sweetcount);
  }, [sweetcount]);

  useEffect(() => {
    console.log('alls users',usercount);
  }, [usercount]);

  const handleaddsweet = () => setActiveSection('addsweet');

  const handleviewall = async () => {
    setActiveSection('allsweet');
    try {
      const response = await get('/sweets/getdata');
      const data = response.data;
      setSweets(data.Sweets);
    } catch (error) {
      console.error('Error fetching sweets:', error);
    }
  };

  useEffect(() => {
    handleviewall();
  }, []);

  const handleusers = async() =>{ 
    setActiveSection('allusers');
    try {
      const response = await get('/dashboard/users');
      const data = response.data;
      setUsers(data.Users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setFileName('');
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:4000/sweets/create", formData);
      if (res.status === 201) {
        alert("Sweet created successfully!");
        console.log(res.data);
      }
    } catch (err) {
      console.error("Error creating sweet:", err);
      alert("Failed to create sweet.");
    }

    setTitle('');
    setDescription('');
    setImage(null);
    setImagePreview(null);
    setFileName('');
    setPrice('');
    e.target.reset();
    alert('submitted');
  };

  const delet = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Sweet?");
    if (isConfirmed) {
    try {
      await axios.delete(`http://localhost:4000/sweets/delete/${id}`);
      alert('Sweet deleted successfully !');
      handleviewall();
    } catch (error) {
      console.error('Failed to delete sweet:', error);
      alert('Failed to delete sweet !!');
    }}
    else{
      console.log('Sweet Deletion is Cancelled !!')
    }
  };

  const openEditPopup = (sweet) => {
    setEditId(sweet._id);
    setTitle(sweet.title);
    setDescription(sweet.desc);
    setPrice(sweet.price);
    setImagePreview(`${BaseUrl}/images/${sweet.image}`);
    setShowPopup(true);
  };

  const updateSweet = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("price", price.toString());
    if (image) formData.append("image", image);

    try {
      const res = await axios.patch(`http://localhost:4000/sweets/update/${editId}`, formData);
      if (res.status === 200) {
        alert("Sweet updated!");
        setShowPopup(false);
        handleviewall();
      }
    } catch (error) {
      alert("Failed to update sweet.");
    }
  };

  const deleteUser = async (userId, role) => {
  // Show confirmation dialog
  const isConfirmed = window.confirm("Are you sure you want to delete this user?");
  
  if (isConfirmed) {
    try {
      await axios.delete(`http://localhost:4000/dashboard/delete/${userId}`);
      alert('User deleted successfully!');   
      handleusers();  // Refresh the users list
    } catch (error) {
      if(role==='admin'){
        alert('User is an Admin')
      }
      console.error('Failed to delete user:', error);
      alert('Failed to delete user.');
    }
  } else {
    console.log("User deletion was cancelled.");
  }
};
  

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[30%] bg-sky-200 border border-black">
        <div className=" grid grid-cols-1">
          <div
            onClick={handledashboard}
            style={{ backgroundColor: activeSection === 'dashboard' ? '#4CAF50' : '' }}
            className="p-4 flex items-center justify-center text-gray-800 hover:bg-sky-400 hover:text-white cursor-pointer transition-all duration-300"
          >
            <FaListAlt size={25} /><span className='mx-3'>Dashboard</span>
          </div>
          <div
            onClick={handleaddsweet}
            style={{ backgroundColor: activeSection === 'addsweet' ? '#4CAF50' : '' }}
            className="p-4 flex items-center justify-center border text-gray-800 hover:bg-sky-400 hover:text-white cursor-pointer transition-all duration-300"
          >
            <FaPlusSquare size={25} /><span className='mx-3'>Add Sweets</span>
          </div>
          <div
            onClick={handleviewall}
            style={{ backgroundColor: activeSection === 'allsweet' ? '#4CAF50' : '' }}
            className="p-4 flex items-center justify-center border text-gray-800 hover:bg-sky-400 hover:text-white cursor-pointer transition-all duration-300"
          >
            <FaEye size={25} /> <span className='mx-3'>View Sweets</span>
          </div>
          <div
            onClick={handleusers}
            style={{ backgroundColor: activeSection === 'allusers' ? '#4CAF50' : '' }}
            className="p-4 flex items-center justify-center border text-gray-800 hover:bg-sky-400 hover:text-white cursor-pointer transition-all duration-300"
          >
            <FaUsers size={25} /><span className='mx-6'>All Users</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-[70%] p-6">
        {/* Dashboard */}
        {activeSection === 'dashboard' && (
          <div className='min-h-screen bg-gradient-to-br from-sky-100 to-pink-100'>
            <h2 className="text-2xl font-bold mb-6 text-center text-sky-600">Dashboard</h2>
            <div className="container mx-auto py-5">
              <div className="grid grid-cols-2 gap-6">
              <div className="bg-green-300 text-center text-black hover:text-white rounded shadow-md p-6 hover:bg-green-400 hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-2xl mt-2">{usercount}</p>
        </div>
        <div className="bg-green-300 text-center text-black hover:text-white rounded shadow-md p-6 hover:bg-green-400 hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300">
          <h3 className="text-xl font-semibold">Total Sweets</h3>
          <p className="text-2xl mt-2">{sweetcount}</p>
        </div>
              </div>
            </div>
          </div>
          
        )}

        {/* Add Sweet */}
        {activeSection === 'addsweet' && (
          <div className='min-h-screen bg-gradient-to-br from-sky-100 to-pink-100'>
          <div className="flex items-center justify-center px-4 py-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold text-center text-sky-500 mb-6">📸 Add New Sweet</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-1 text-gray-600 font-bold">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-600 font-bold">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Write something about the post..."
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-gray-600 font-bold">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full text-sky-700 bg-green-100 border border-black mb-2"
                  />
                  {fileName && <p className="text-sm text-gray-500 mb-2">📁 {fileName}</p>}
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 rounded-lg shadow-md w-full max-w-xs h-auto"
                    />
                  ) : (
                    <p className="text-sm text-gray-400 italic font-bold">No image selected</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-gray-600 font-bold">Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    min="1"
                    step="0.01"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Enter price"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-400 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Submit Post
                </button>
              </form>
            </div>
          </div>
          </div>
        )}

        {/* View All Sweets */}
        {activeSection === 'allsweet' && (
          <div className='min-h-screen bg-gradient-to-br from-sky-100 to-pink-100'>
          <div className="container mx-auto py-5">
            <h2 className="text-2xl font-bold mb-6 text-center text-sky-600">🍬 All Sweets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {sweets.map((sweet) => (
                <div key={sweet._id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={`${BaseUrl}/images/${sweet.image}`}
                    alt={sweet.title}
                    className="rounded-md mb-4 w-full h-48 object-cover"
                  />
                  <h5 className="text-center bg-green-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-green-600 transition-colors">
                    {sweet.title}
                  </h5>
                  <p className="text-center bg-sky-100 rounded text-lg text-gray-800 font-semibold mt-2">
                  ₹ {sweet.price}
                  </p>
                  <div className='min-h-18 mt-3 p-3 text-center bg-green-50 text-gray-700 border border-green-200 rounded-md shadow-sm'>
                    <p>{sweet.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <button
                      onClick={() => delet(sweet._id)}
                      className="bg-red-200 text-white py-2 rounded-md hover:bg-red-400 transition duration-200"
                    >
                      ❌ Delete
                    </button>
                    <button
                      onClick={() => openEditPopup(sweet)}
                      className="bg-yellow-200 text-white py-2 rounded-md hover:bg-yellow-500 transition duration-200"
                    >
                      ✏️ Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        )}

{showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg relative">
            <button onClick={() => setShowPopup(false)} 
              className="absolute top-2 right-3 text-lg font-bold text-grey-500 hover:text-red-500">
                ×</button>

              <h3 className="text-xl font-bold mb-4 text-center text-sky-600">Update Sweet</h3>

              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} 
              className="w-full p-2 border mb-3" placeholder="Title" />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border mb-3" placeholder="Description">
              </textarea>
              <input type="number" value={price} onChange={(e) => setPrice((Number(e.target.value)))} className="w-full p-2 border mb-3" placeholder="Price" />
              <input type="file" onChange={handleImageChange} className="mb-3" />
              {imagePreview && <img src={imagePreview} className="w-full h-40 object-cover rounded mb-3" />}
              <button onClick={updateSweet} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Update Sweet</button>
            </div>
          </div>
        )}

        {/* All Users */}
        {activeSection === 'allusers' && (
          <div className='min-h-screen bg-gradient-to-br from-sky-100 to-pink-100'>
          <div className="container mx-auto py-5">
            <h2 className="text-2xl font-bold mb-6 text-center text-sky-600">👥 All Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-green-200 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 border-b">Serial No</th>
                    <th className="py-3 px-4 border-b">User</th>
                    <th className="py-3 px-4 border-b">Email</th>
                    <th className="py-3 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user._id} className="text-center hover:bg-sky-200 transition duration-200">
                      <td className="py-2 px-4 border-b">{index+1}</td>
                      <td className="py-2 px-4 border-b">{user.Fullname}</td>
                      <td className="py-2 px-4 border-b">{user.Email}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => deleteUser(user._id, user.role)}
                          className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          ❌ Delete
                        </button>
                      </td>
                    </tr>
                 ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
