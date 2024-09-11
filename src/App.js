import React from 'react';
import './App.css';
import { auth } from "../src/config/firebase";
import { useState, useEffect } from 'react';
import {UserBtn, AdminBtn,HomeBtn } from './home/home';
import { onAuthStateChanged} from 'firebase/auth';

import { Auth } from './admin/components/auth/auth';
import AddUserForm, { } from './userLog/UsersLog';
import { DndContext } from '@dnd-kit/core';
import { Draggable, Droppable } from './admin/components/auth/KanBan';
import { NavBar} from './admin/components/auth/NavBar';


function App() {
  const [currentView, setCurrentView] = useState('first');
  const [setUser] = useState(null);

  const handleAdminClick = () => {
    setCurrentView('second');
  };

 

const handleUserClick = () => {
    setCurrentView('third');
  };
const homePage = () =>{
  setCurrentView('first')
}


  return (
      <div>
           {currentView === 'first' && (
           <div>
            <NavBar/>
        
          <div className='flex space-x-14  items-center justify-center min-h-screen'>
            <AdminBtn onClick={handleAdminClick} />
            <UserBtn onClick={handleUserClick} />
          </div>
      </div>
     
    )}
    {currentView === 'second' && (
      <div>
      <div>
         <Auth />
         <HomeBtn onClick={homePage}/>
      </div>
      </div>
    )}
      {currentView === 'third' && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-3 max-w-xs w-full">
            <AddUserForm />
            <HomeBtn onClick={homePage} />
          </div>
        </div>
   
    
    )}
 
      </div>
 
    
  );
}

export default App;