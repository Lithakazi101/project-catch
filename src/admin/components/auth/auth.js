import  { auth } from "../../../config/firebase";
import {useState, useEffect} from "react";
import { signInWithEmailAndPassword , onAuthStateChanged, signOut} from 'firebase/auth';
// import { NavBar } from "./NavBar";
// import { KanBan } from "./KanBan";
import UsersList from "../../../config/firebase";
import { KanBan } from "./KanBan";


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
  
    const signIn = async () => {
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
                
                <div className="py-7">
                  <p>Welcome, {user.email}</p>
                  <KanBan />
                  <button onClick={logout}>Logout</button>
          </div>

          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Login</button>
          </>
        )}
      </div>
    );
  };