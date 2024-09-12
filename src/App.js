import React, { useState } from 'react';
import './App.css';
import { UserBtn, AdminBtn } from './home/home';
import { Auth } from './admin/components/auth/auth';
import AddUserForm from './userLog/UsersLog';
import { NavBar } from './admin/components/auth/NavBar';
import ContactedFx, {  FrequentVisitorFx, OnHolidayFx,  VisitorsFx } from './admin/components/auth/Filter';

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

  const handleContacted = () => {
    setCurrentView('forth');
  };

  const handleVisitors = () => {
    setCurrentView('fifth');
  };

  const handleOnHoliday = () => {
    setCurrentView('sixth');
  };

  const handleFrequentVisitor = () => {
    setCurrentView('seventh');
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
          <div className="flex space-x-4 float-right">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1 0h22l-9 14.094v9.906l-4-2v-7.906z"/></svg><h3>Filtered View:</h3>
          <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleContacted}
              >Contacted Visitors</button>
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleVisitors}
              >Visitors</button>
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleFrequentVisitor}
              >Frequent Visitors</button>
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleOnHoliday}
              >
                On Holiday
              </button>
          </div>
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

      {currentView === 'forth' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>Contacted Visitors</h2>
          <ContactedFx />
          <div className='mb-4'>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAdminClick}>Back</button>
          </div>
         
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={homePage}>Home Page</button>
        </div>
      )}

      {currentView === 'fifth' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>Visitors</h2>
          <VisitorsFx />
          <div className='mb-4'>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAdminClick}>Back</button>
          </div>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={homePage}>Home Page</button>
          
        </div>
      )}

      {currentView === 'sixth' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>On Holiday</h2>
          <OnHolidayFx />      
           <div className='mb-4'>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAdminClick}>Back</button>
          </div>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={homePage}>Home Page</button>

        </div>
      )}

      {currentView === 'seventh' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>Frequent Visitors</h2>
          <FrequentVisitorFx />
          <div className='mb-4'>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAdminClick}>Back</button>
          </div>

          <button  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={homePage}>Home</button>
        </div>
      )}
    </div>
  );
}

export default App;
