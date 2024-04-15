import React, { useState } from 'react';
import { db } from '../../../firebase/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignupStoreOwner() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        medicalStoreName: '',
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
            const docRef = await addDoc(collection(db, 'StoreOwners'), formData);
            console.log('Store Owner added successfully to Firestore with ID:', docRef.id);
            // Reset form data after submission
            setFormData({
                name: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: '',
                medicalStoreName: '',
            });
        } catch (error) {
            console.error('Error storing data:', error);
        }
        navigate('/login');

    };

    return (
        <div className="App">
            <h1>Signup Form for Store Owner</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="medicalStoreName">Medical Store Name:</label>
                <input
                    type="text"
                    id="medicalStoreName"
                    name="medicalStoreName"
                    value={formData.medicalStoreName}
                    onChange={handleChange}
                    required
                />
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignupStoreOwner;
