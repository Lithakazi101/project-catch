import  { auth} from "../../../config/firebase";
import {useState, useEffect} from "react";
import { signInWithEmailAndPassword , onAuthStateChanged, signOut} from 'firebase/auth';
import { NavBarAdmin } from "./NavBar";
import KanBan from "./KanBan";
import ContactedFx, {  FrequentVisitorFx, OnHolidayFx,  VisitorsFx } from './Filter';




export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [currentView, setCurrentView] = useState('loggedIn')
  
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
  
    const signIn = async (event) => {
      event.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setError(""); // Clear error message on successful login
      } catch (error) {
        setError(error.message);
      }
    };
    const handleAdminClick = () => {
      setCurrentView('loggedIn');
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

    const logout = async () => {
      try {
        await signOut(auth);
        console.log("User signed out");
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    };
  
    return (
      <div>

        {error && <p>{error}</p>}
        {user ? (
          <div>
            <div>
              {currentView ==='loggedIn' &&(
                <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
                   <div className="flex space-x-4 float-right  mb-7">
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
                  <NavBarAdmin/>
                 
                  <div className="py-7 mt-5">
                      <div>
                      <h3>Welcome {user.email}</h3>
                      </div>
                      
                    
                      <KanBan/>
                      <button  className="flex justify-center align-middle bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={logout}>Logout</button>
                  </div>
                </div>
                )}
            </div>
              {currentView === 'forth' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>Contacted Visitors</h2>
          <ContactedFx />
          <div className='mb-4'>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAdminClick}>Back</button>
          </div>
         
        </div>
      )}

      {currentView === 'fifth' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>Visitors</h2>
          <VisitorsFx />
          <div className='mb-4'>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAdminClick}>Back</button>
          </div>
          
        </div>
      )}

      {currentView === 'sixth' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>On Holiday</h2>
          <OnHolidayFx />      
           <div className='mb-4'>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAdminClick}>Back</button>
          </div>

        </div>
      )}

      {currentView === 'seventh' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>Frequent Visitors</h2>
          <FrequentVisitorFx />
          <div className='mb-4'>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAdminClick}>Back</button>
          </div>

        </div>
      )}

          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={signIn} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-3 max-w-xs w-full'>
              <label className="text-gray-700 text-sm font-bold mb-4">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="text-gray-700 text-sm font-bold mb-4">Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="rounded border border-neutral-800 p-2 active:cursor-grabbing mt-6" type="submit" onClick={signIn}>Log in</button>
              
            </form>
          
          </div>
        )}
      </div>
    );
  };