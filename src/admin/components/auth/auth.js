import UsersList, { auth } from "../../../config/firebase";
import {useState} from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';


export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error ${errorCode}: ${errorMessage}`);
        }
    };

    return (
        <div>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
            />
            <button onClick={signIn}>Sign In</button>
          
        </div>
    );
};
