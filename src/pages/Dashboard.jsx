import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';

const Dashboard = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { loading: authLoading, profileLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className='mt-10 text-center'>Loading...</div>
    );
  }

  // Handler when user clicks a link inside Sidebar
  const handleSidebarLinkClick = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
      {/* Desktop Sidebar */}
      <div className='hidden md:flex'>
        <Sidebar onLinkClick={handleSidebarLinkClick} />
      </div>

      {/* Mobile Hamburger on Left */}
      {!mobileSidebarOpen && (
        <div className='md:hidden absolute top-4 left-4 z-50'>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className='text-2xl text-gray-800 p-2 bg-gray-200 rounded-md'
          >
            <GiHamburgerMenu />
          </button>
        </div>
      )}

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className='fixed inset-0 bg-black/50 z-40' onClick={() => setMobileSidebarOpen(false)}>
          <div
            className='bg-gray-900 w-64 h-full p-4'
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside sidebar
          >
            <Sidebar onLinkClick={handleSidebarLinkClick} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className='flex-1 h-[calc(100vh-3.5rem)] overflow-auto w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;



