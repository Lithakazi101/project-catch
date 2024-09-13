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
  const [currentView, setCurrentView] = useState("loggedIn");

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
    setCurrentView("loggedIn");
  };
  const handleContacted = () => {
    setCurrentView("forth");
  };

  const handleVisitors = () => {
    setCurrentView("fifth");
  };

  const handleOnHoliday = () => {
    setCurrentView("sixth");
  };

  const handleFrequentVisitor = () => {
    setCurrentView("seventh");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {user ? (
       <div className="w-full max-w-2xl">
       {currentView === "loggedIn" && (
         <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
           <div className="flex flex-wrap justify-center gap-4 mb-6">
             <div className="flex items-center space-x-2">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
               >
                 <path d="M1 0h22l-9 14.094v9.906l-4-2v-7.906z" />
               </svg>
               <h3 className="font-semibold">Filtered View:</h3>
             </div>
             <button
               className="bg-green-700 text-white text-sm px-2 py-1 rounded hover:bg-green-600"
               onClick={handleContacted}
             >
               Contacted Visitors
             </button>
             <button
               className="bg-green-700 text-white text-sm px-2 py-1 rounded hover:bg-green-600"
               onClick={handleVisitors}
             >
               Visitors
             </button>
             <button
               className="bg-green-700 text-white text-sm px-2 py-1 rounded hover:bg-green-600"
               onClick={handleFrequentVisitor}
             >
               Frequent Visitors
             </button>
             <button
               className="bg-green-700 text-white text-sm px-2 py-1 rounded hover:bg-green-600"
               onClick={handleOnHoliday}
             >
               On Holiday
             </button>
           </div>
           <NavBarAdmin />
           <div className="mt-6 text-center">
             <h3 className="text-lg">Welcome, {user.email}</h3>
           </div>
           <KanBan />
           <button
             className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
             onClick={logout}
           >
             Logout
           </button>
         </div>
       )}
     
       {currentView === "forth" && (
         <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
           <h2 className="text-xl font-bold">Contacted Visitors</h2>
           <ContactedFx />
           <button
             className="bg-green-700 text-white text-sm px-2 py-1 rounded hover:bg-green-600 mt-4"
             onClick={handleAdminClick}
           >
             Back
           </button>
         </div>
       )}
     
       {currentView === "fifth" && (
         <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
           <h2 className="text-xl font-bold">Visitors</h2>
           <VisitorsFx />
           <button
             className="bg-green-700 text-white text-sm px-2 py-1 rounded hover:bg-green-600 mt-4"
             onClick={handleAdminClick}
           >
             Back
           </button>
         </div>
       )}
     
       {currentView === "sixth" && (
         <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
           <h2 className="text-xl font-bold">On Holiday</h2>
           <OnHolidayFx />
           <button
             className="bg-green-700 text-white text-sm px-2 py-1 rounded hover:bg-green-600 mt-4"
             onClick={handleAdminClick}
           >
             Back
           </button>
         </div>
       )}
     
       {currentView === "seventh" && (
         <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
           <h2 className="text-xl font-bold">Frequent Visitors</h2>
           <FrequentVisitorFx />
           <button
             className="bg-green-700 text-white text-sm px-2 py-1 rounded hover:bg-green-600 mt-4"
             onClick={handleAdminClick}
           >
             Back
           </button>
         </div>
       )}
     </div>
     
      ) : (
        <div className="flex items-center justify-center min-h-screen w-full">
          <form
            onSubmit={signIn}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-3 max-w-xs w-full"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
