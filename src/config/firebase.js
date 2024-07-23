import React from "react";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import { DndContext, closestCenter } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';
import { SortableContext,useSortable, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
 

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


const SortableUser = ({user}) =>{
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: user.id});
  const style = {
    transition, transform: CSS.Transform.toString(transform),
  }
  
  return(
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} key={user.id}  className="cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing">
    <h2>{user.Name}</h2>{/* Adjust this to match your user data */}
    <p>{user.email}</p>
    <p>{user.number}</p>
    </div>
  )
}
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
 const onDragEnd = (event) => {
    const { active, over} = event;
    if(active.id == over.id) {
      return;
    }
    setUsers((users) =>{
      const oldIndex =users.findIndex((user) => user.id === active.id);
      const newIndex = users.findIndex((user) => over.id);
      return arrayMove(users,oldIndex, newIndex);
    })
 }
  return (
    <div>
      <h1>Users List</h1>
      <div >
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={users} strategy={verticalListSortingStrategy}>
        {users.map((user) => (
          <SortableUser key={user.id} user={user}/>
          
        ))}
        </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default UsersList;

