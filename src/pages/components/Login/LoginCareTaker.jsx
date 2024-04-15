import React, { useState } from 'react';
import {db } from '../../../firebase/firebase'; 
// Assuming you have a firebase folder with a file named firebase.js where you initialize Firebase
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const LoginCareTaker = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("here")

    try {
      // Check if the user exists in the 'ElderlyUsers' collection in Firestore
      const q = query(collection(db, 'CareTakers'), where('email', '==', email),where('password','==',password));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('User not found.');
      } else {
        console.log('User logged in successfully!');
        querySnapshot.forEach((doc) => {
            console.log('User ID:', doc.id);
            const id=doc.id;
            // Redirect or perform other actions upon successful login
            navigate("/CT/Home",{state:{id}});
            
          });
        // Redirect or perform other actions upon successful login
      }
      // You can redirect the user or perform other actions upon successful sign-in
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div class="m-auto p-4 w-2/4 bg-blue-50 rounded-2xl">
    <h2 class="p-4 text-center text-2xl font-bold font-serif">Login as Care Taker</h2>
    <form  class="p-4 text-4 text-blue-400 font-serif" onSubmit={handleSignIn}>
      <label class="text-lg">Email:</label>
      <input class="border-2 ml-3 h-6"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <label class="text-lg">Password:</label>
      <input class="border-2 ml-3 h-6"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button class="p-1 pl-3 pr-3 mt-3 rounded-lg bg-blue-500 text-white font-serif" type="submit">Login In</button>
    </form>
  </div>
  );
};

export default LoginCareTaker;
