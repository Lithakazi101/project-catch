import {React, useState} from "react";
import { addDoc } from "firebase/firestore";
import { colRef } from "../config/firebase";

function AddUserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addDoc(colRef, {
          name,
          email,
          number
        });
        setName('');
        setEmail('');
        setNumber('');
        alert('User added successfully!');
      } catch (error) {
        console.error('Error adding document: ', error);
        alert('Error adding user');
      }
    };
  
    return (
       <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="First and Last name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Cellphone Nr:</label>
          <input
            type="number"
            placeholder="Cellphone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    );
  }
  
  export default AddUserForm;
  