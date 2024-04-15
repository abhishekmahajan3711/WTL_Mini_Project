import React, { useState } from 'react';
import { db } from '../../../firebase/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignupElderly() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'ElderlyUsers'), formData);
      console.log('User added successfully to Firestore with ID:', docRef.id);
      // Reset form data after submission
      setFormData({
        name: '',
        age: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
      });
    } catch (error) {
      console.error('Error storing data:', error);
    }
    navigate('/login');
  };

  return (
    <div className="App m-auto p-4 w-2/4 bg-blue-100 rounded-2xl">
      <h1 class="p-4 text-center text-2xl font-bold font-serif">Signup Form for Elderly User</h1>
      <form  class="p-4 text-4 text-blue-400 font-serif text-lg" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input class="border-2 ml-3 h-6"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="age">Age:</label>
        <input class="border-2 ml-3 h-6"
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input class="border-2 ml-3 h-6"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="password">Password:</label>
        <input class="border-2 ml-3 h-6"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="address">Address:</label>
        <input class="border-2 ml-3 h-6"
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input class="border-2 ml-3 h-6"
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <br />

        <button class="p-1 pl-3 pr-3 mt-3 rounded-lg bg-blue-500 text-white font-serif"type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignupElderly;
