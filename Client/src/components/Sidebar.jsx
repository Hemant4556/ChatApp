import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';
 
const Sidebar = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);

    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/user/logout`);
    
            if (res.status === 200) {
                dispatch(setAuthUser (null));
                dispatch(setMessages(null));
                dispatch(setOtherUsers(null));
                dispatch(setSelectedUser (null));
                toast.success(res.data.message);
    
                navigate("/login");
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during logout. Please try again.");
        }
    }
    return (
        <div className='flex flex-col h-screen bg-gray-900 p-9'>
    <div className='flex items-center justify-between border-b border-slate-600 pb-4 mb-4'>
        <span className='text-white text-2xl font-bold'>Chat</span>
        <button onClick={logoutHandler} className='btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition duration-200'>
            Logout
        </button>
    </div>
    
    <div className='flex items-center mt-4 mb-6'>
        <span className='text-white text-xl font-medium'>Hi, {authUser  ?.fullName}</span>
    </div>

    <div className="divider my-4" style={{color:'green', fontWeight: 'bold'}}>Users</div> 

    <div className='flex-grow overflow-y-auto bg-gray-800 rounded-lg shadow-lg p-9'>
        <OtherUsers />
    </div>
</div>
    )
}

export default Sidebar