import React, { useState } from 'react';
import './App.css';
import { UserBtn, AdminBtn } from './home/home';
import { Auth } from './admin/components/auth/auth';
import AddUserForm from './userLog/UsersLog';
import { NavBar } from './admin/components/auth/NavBar';

function App() {
  const [currentView, setCurrentView] = useState('first');

  const handleAdminClick = () => {
    setCurrentView('second');
  };

  const handleUserClick = () => {
    setCurrentView('third');
  };

  const homePage = () => {
    setCurrentView('first');
  };



  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {currentView === 'first' && (
        <div>
          <NavBar />
          <div className="flex space-x-14 items-center justify-center min-h-screen">
            <AdminBtn onClick={handleAdminClick} />
            <UserBtn onClick={handleUserClick} />
          </div>
        </div>
      )}

      {currentView === 'second' && (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
   
          <Auth />
          <div className='home'>   
                   <button  className="home bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 " onClick={homePage}>Home</button>
          </div>
        </div>
      )}

      {currentView === 'third' && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-3 max-w-xs w-full">
            <AddUserForm />
            <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={homePage}>Home Page</button>
          </div>
        </div>
      )}


    </div>
  );
}

export default App;
