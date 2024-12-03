import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import your CSS for styling

const HomePage = () => {
  const { authUser  } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser ) {
      navigate("/login");
    }
  }, [authUser , navigate]);

  return (
    <div className='home-page'>
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default HomePage;