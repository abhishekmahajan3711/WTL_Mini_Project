import React, { useState } from 'react';
import { db } from '../../../firebase/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignupCareTaker() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        age: '',
        gender: '',
        weekdays: [],
        dayAvailability: [],
        availableTill: '',
        booked:false,
        status:"available",
        eu_id:"",
        confirm:"no"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked ? [...prevData[name], e.target.value] : prevData[name].filter((day) => day !== e.target.value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, 'CareTakers'), formData);
            console.log('CareTaker added successfully to Firestore with ID:', docRef.id);
            // Reset form data after submission
            setFormData({
                name: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: '',
                age: '',
                gender: '',
                weekdays: [],
                dayAvailability: [],
                availableTill: '',
            });
        } catch (error) {
            console.error('Error storing data:', error);
        }
        navigate("/login");
        
    };

    return (
        <div className="App  m-auto p-4 w-2/4 bg-blue-100 rounded-2xl">
            <h1 class="p-4 text-center text-2xl font-bold font-serif">Signup Form for CareTaker</h1>
            <form class="p-4 text-4 text-blue-400 font-serif text-lg" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input class="border-2 ml-3 h-6 m-1 text-sm "
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="email">Email:</label>
                <input class="border-2 ml-3 h-6 m-1 text-sm "
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="password">Password:</label>
                <input class="border-2 ml-3 h-6 m-1 text-sm "
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="address">Address:</label>
                <input class="border-2 ml-3 h-6 m-1 text-sm "
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input class="border-2 ml-3 h-6 m-1 text-sm "
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="age">Age:</label>
                <input class="border-2 ml-3 h-6 m-1 text-sm "
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="gender">Gender:</label>
                <select class="border-2 ml-3 h-6 text-sm " id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <br />

                <label class="mt-2">Available Weekdays:</label>
                <div class="grid grid-cols-6 gap-4 p-4 border-blue-700 border mt-2 rounded-2xl text-base">
                    <input type="checkbox" id="sunday" name="weekdays" value="sunday" onChange={handleCheckboxChange} />
                    <label class="ml-1" htmlFor="sunday">Sunday</label>
    
                    <input type="checkbox" id="monday" name="weekdays" value="monday" onChange={handleCheckboxChange} />
                    <label htmlFor="monday">Monday</label>
              
                    <input type="checkbox" id="tuesday" name="weekdays" value="tuesday" onChange={handleCheckboxChange} />
                    <label htmlFor="tuesday">Tuesday</label>
              
                    <input type="checkbox" id="wednesday" name="weekdays" value="wednesday" onChange={handleCheckboxChange} />
                    <label htmlFor="wednesday">Wednesday</label>
          
                    <input type="checkbox" id="thursday" name="weekdays" value="thursday" onChange={handleCheckboxChange} />
                    <label htmlFor="thursday">Thursday</label>
               
                    <input type="checkbox" id="friday" name="weekdays" value="friday" onChange={handleCheckboxChange} />
                    <label htmlFor="friday">Friday</label>
        
                    <input type="checkbox" id="saturday" name="weekdays" value="saturday" onChange={handleCheckboxChange} />
                    <label htmlFor="saturday">Saturday</label>
                </div>
                <br />

                <label>Day Availability:</label>
                <div class="flex gap-4 p-4 border-blue-700 border mt-2 rounded-2xl text-base">
                    <input type="checkbox" id="9-1" name="dayAvailability" value="9-1" onChange={handleCheckboxChange} />
                    <label htmlFor="9-1">9 AM to 1 PM</label>
               
                    <input type="checkbox" id="1-5" name="dayAvailability" value="1-5" onChange={handleCheckboxChange} />
                    <label htmlFor="1-5">1 PM to 5 PM</label>
               
                    <input type="checkbox" id="5-9" name="dayAvailability" value="5-9" onChange={handleCheckboxChange} />
                    <label htmlFor="5-9">5 PM to 9 PM</label>
               
                    <input type="checkbox" id="9-12" name="dayAvailability" value="9-12" onChange={handleCheckboxChange} />
                    <label htmlFor="9-12">9 AM to 12 PM</label>
                </div>
                <br />


                <label htmlFor="availableTill">Available Till (Date):</label>
                <input class="border-2 ml-3 h-6 m-1 text-sm "
                    type="date"
                    id="availableTill"
                    name="availableTill"
                    value={formData.availableTill}
                    onChange={handleChange}
                    required
                />
                <br />

                <button class="p-1 pl-3 pr-3 mt-3 rounded-lg bg-blue-500 text-white font-serif" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignupCareTaker;
