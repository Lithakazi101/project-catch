import React from 'react';
import './App.css';
import { useState } from 'react';
import {UserBtn, AdminBtn } from './home/home';
import { Auth } from './admin/components/auth/auth';
import { LoginBtn, UserInput } from './userLog/UsersLog';
import UsersList from './config/firebase';





function App() {
  const [currentView, setCurrentView] = useState('first');

  const handleAdminClick = () => {
    setCurrentView('second');
  };

  const handleUserClick = () => {
    setCurrentView('third');
  };

  return (
    <div>
      {currentView === 'first' && (
        <div>
          <AdminBtn onClick={handleAdminClick} />
          <UserBtn onClick={handleUserClick} />
        </div>
      )}
      {currentView === 'second' && (
        <div>
          <Auth />
          <UsersList/>
        </div>
        )
      }
      {currentView === 'third' && (
        <div>
       
       <UserInput />
       <LoginBtn/>
      
      </div>)}
    </div>
  );
}



export default App;