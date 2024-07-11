import React from "react";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyCTb0ckZQBwrsQgrs0d4Vk0BmrgceXpZ7M",
  authDomain: "project-catch-3.firebaseapp.com",
  projectId: "project-catch-3",
  storageBucket: "project-catch-3.appspot.com",
  messagingSenderId: "606579526490",
  appId: "1:606579526490:web:f744ba9c4aeec231bb4163",
  measurementId: "G-F4V1ZP2C41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};
const db = getFirestore(app);
export {db};
const colRef = collection(db, 'users');
export {colRef};

//get collection from db
function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let usersArray = [];
        snapshot.docs.forEach((doc) => {
          usersArray.push({ ...doc.data(), id: doc.id });
        });
        setUsers(usersArray);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.Name} - {user.Surname} {/* Adjust this to match your user data */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;

