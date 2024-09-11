import  { auth} from "../../../config/firebase";
import {useState, useEffect} from "react";
import { signInWithEmailAndPassword , onAuthStateChanged, signOut} from 'firebase/auth';
import { NavBarAdmin } from "./NavBar";
import KanBan from "./KanBan";



export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
  
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
              <NavBarAdmin/>
                <div className="py-7">
                <p>Welcome, {user.email}</p>
               
                <KanBan/>
                
              <button onClick={logout}>Logout</button>
          </div>

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