import React from 'react';
import './App.css';
import { useState} from 'react';
import {UserBtn, AdminBtn,HomeBtn } from './home/home';
import { Auth } from './admin/components/auth/auth';
import AddUserForm, { } from './userLog/UsersLog';
import { NavBar} from './admin/components/auth/NavBar';
import ContactedFx, { ContactedButton, FrequentVisitorButton, FrequentVisitorFx, OnHolidayFx, VisitorsButton, VisitorsFx , OnHolidayButton} from './admin/components/auth/Filter';


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
const Contacted = () =>{
 setCurrentView('forth');
}
const Visitors = () =>{
  setCurrentView('fifth');
 }
 const onHoliday = () =>{
  setCurrentView('sixth');
 }
 const FrequentVisitor = () =>{
  setCurrentView('forth');
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
        <ContactedButton onClick={Contacted}/>
        <VisitorsButton onClick={Visitors}/>
        <FrequentVisitorButton onClick={FrequentVisitor}/>
        <onHolidayButton onClick={onHoliday}/>

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
      {currentView === 'forth' && (
        <div>
          <ContactedFx />
        </div>
      )
      }
      {currentView ==="fifth" &&(
        <div>
           <VisitorsFx/>
        </div>
      )
      }
      {currentView =="sixth" &&(
        <div>
           <OnHolidayFx/>
        </div>
      )
      }
      {currentView === "seventh"(
        <div>
          <FrequentVisitorFx/>
        </div>
      )

      }
      </div>
 
    
  );
}

export default App;
