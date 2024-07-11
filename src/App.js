import React from 'react';
import './App.css';
import { auth } from "../src/config/firebase";
import { useState, useEffect } from 'react';
import {UserBtn, AdminBtn } from './home/home';
import { onAuthStateChanged} from 'firebase/auth';

import { Auth } from './admin/components/auth/auth';
import AddUserForm, { } from './userLog/UsersLog';



function App() {
  const [currentView, setCurrentView] = useState('first');
  const [user, setUser] = useState(null);

  const handleAdminClick = () => {
    setCurrentView('second');
  };

  const handleUserClick = () => {
    setCurrentView('third');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);



  return (
    <div>
     {currentView === 'first' && (
    <div>
      <AdminBtn onClick={handleAdminClick} />
      <UserBtn onClick={handleUserClick} />
    </div>
  )}
  {currentView === 'second' && <Auth />}
  {currentView === 'third' && <AddUserForm />}
  {/* {user && (
    <button onClick={logout}>Logout</button>
  )} */}
    </div>
  );
}

export default App;