import React, { useState } from 'react';
import {db } from '../../../firebase/firebase'; 
// Assuming you have a firebase folder with a file named firebase.js where you initialize Firebase
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const LoginStoreOwner = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Check if the user exists collection in Firestore
      const q = query(collection(db, 'StoreOwners'), where('email', '==', email),where('password','==',password));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('Store owner not found.');
      } else {
        console.log('User logged in successfully!');
        querySnapshot.forEach((doc) => {
            console.log('User ID:', doc.id);
            const id=doc.id;
            // Redirect or perform other actions upon successful login
            navigate("/SO/Home",{state:{id}});
          });
        // Redirect or perform other actions upon successful login
      }
      // You can redirect the user or perform other actions upon successful sign-in
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login as Store Owner</h2>
      <form onSubmit={handleSignIn}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginStoreOwner;
