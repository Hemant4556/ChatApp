import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector,useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <>
            {
        selectedUser  !== null ? (
            <div className='md:min-w-[700px] flex flex-col h-screen' style={{backgroundColor: 'rgba(86, 78, 87, 0.8)', width: '80%', margin: '0 auto'}}>
                <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                    <div className={`avatar ${isOnline ? 'online' : ''}`} style={{borderRadius: '50%', width: '40px', height: '40px', backgroundColor: 'gray'}}></div>
                    <div className='flex flex-col flex-1'>
                        <p className='font-bold'>{selectedUser  ?.fullName}</p>
                        <p className={`text-sm ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>{isOnline ? 'Online' : 'Offline'}</p>
                    </div>
                </div>
        
                <div className='flex-1 overflow-y-auto p-4'>
                    <Messages />
                </div>
        
                <div className='flex items-center bg-zinc-800 p-2'>
                    <SendInput />
                </div>
            </div>
        ) : (
            <div className='md:min-w-[550px] flex flex-col justify-center items-center' style={{width: '80%', margin: '0 auto'}}>
                <h1 className='text-4xl text-white font-bold'>Hi,{authUser ?.fullName} </h1>
                <h1 className='text-2xl text-white'>Let's start conversation</h1>
            </div>
        )
            }
        </>

    )
}

export default MessageContainer