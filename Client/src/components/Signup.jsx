import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  // Handle gender selection
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      console.log(error);
    }

    // Reset form
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  }

  return (
    <div className="min-w-96 mx-auto mt-4">
    <div className='w-full p-4 rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-purple-500'>
      <h1 className='text-3xl font-bold text-white text-center mb-2'>Register</h1>
      <form onSubmit={onSubmitHandler}>
          <label className='label text-white'>
            <span className='text-lg'>Full Name</span>
          </label>
          <input
            value={user.fullName}
            onChange={(e) => setUser ({ ...user, fullName: e.target.value })}
            className='w-full input input-bordered h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300'
            type="text"
            placeholder='Full Name' />
        <div className='mb-4'>
          <label className='label text-white'>
            <span className='text-lg'>Username</span>
          </label>
          <input
            value={user.username}
            onChange={(e) => setUser ({ ...user, username: e.target.value })}
            className='w-full input input-bordered h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300'
            type="text"
            placeholder='Username' />
        </div>
        <div className='mb-4'>
          <label className='label text-white'>
            <span className='text-lg'>Password</span>
          </label>
          <input
            value={user.password}
            onChange={(e) => setUser ({ ...user, password: e.target.value })}
            className='w-full input input-bordered h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300'
            type="password"
            placeholder='Password' />
        </div>
        <div className='mb-4'>
          <label className='label text-white'>
            <span className='text-lg'>Confirm Password</span>
          </label>
          <input
            value={user.confirmPassword}
            onChange={(e) => setUser ({ ...user, confirmPassword: e.target.value })}
            className='w-full input input-bordered h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300'
            type="password"
            placeholder='Confirm Password' />
        </div>
        <div className='flex items-center justify-between my-4'>
        <div className='flex items-center'>
    <p className='text-white'>Male</p>
            <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="checkbox mx-2 border border-black" /> {/* Added border class */}
        </div>
        <div className='flex items-center'>
            <p className='text-white'>Female</p>
            <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="checkbox mx-2 border border-black" /> {/* Added border class */}
        </div>
        </div>
        <p className='text-center text-white my-2'>Already have an account? <Link to="/login" className='text-blue-200'> login </Link></p>
        <div>
          <button type='submit' className='btn btn-block btn-lg mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300'>Signup</button>
        </div>
      </form>
    </div>
  </div>
  
  );
}

export default Signup;
