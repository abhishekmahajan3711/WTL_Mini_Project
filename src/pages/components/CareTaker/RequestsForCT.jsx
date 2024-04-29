import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase'; // Import your Firebase instance
import { collection, getDocs, query, where, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

export default function RequestsForCT() {
    let location = useLocation();
    const cu_id = location.state?.id;
    console.log(cu_id);
    const [requests, setRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                if (cu_id) {
                    const caretakerRef = doc(db, 'CareTakers', cu_id);
                    const caretakerDocSnapshot = await getDoc(caretakerRef);

                    if (caretakerDocSnapshot.exists()) {
                        const caretakerData = caretakerDocSnapshot.data();
                        setRequests(caretakerData);
                    } else {
                        console.error('CareTaker document not found.');
                    }
                } else {
                    console.error('cu_id not provided.');
                }
            } catch (error) {
                console.error('Error fetching CareTaker document:', error);
            }
        };

        fetchRequests();
    }, []);


    const handleConfirmRequest = async () => {
        try {
            const requestRef = doc(db, 'CareTakers', cu_id);
            await updateDoc(requestRef, { confirm: 'yes' });
            setRequests((prevData) => ({
                ...prevData, confirm: 'yes'
            }))
            alert('Request confirmed successfully.');
        } catch (error) {
            console.error('Error confirming request:', error);
        }
    };

    const handleCancelConfirmation = async () => {
        try {
            const requestRef = doc(db, 'CareTakers', cu_id);
            await updateDoc(requestRef, { confirm: 'no' });
            setRequests((prevData) => ({
                ...prevData, confirm: 'no'
            }))
            alert('Request cancelled successfully.');
        } catch (error) {
            console.error('Error confirming request:', error);
        }
    };

    const handleShowElderlyDetails = async (eu_id) => {
        try {
            const elderlyUserRef = doc(db, 'ElderlyUsers', eu_id);
            const elderlyUserSnapshot = await getDoc(elderlyUserRef);
            if (elderlyUserSnapshot.exists()) {
                const elderlyUserData = elderlyUserSnapshot.data();
                setModalData(elderlyUserData);
                setShowModal(true);
            } else {
                alert('Elderly user not found.');
            }
        } catch (error) {
            console.error('Error fetching elderly user details:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalData(null);
    };


    const [formData, setFormData] = useState({
        weekdays: [],
        dayAvailability: [],
        availableTill: '',

    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked ? [...prevData[name], e.target.value] : prevData[name].filter((day) => day !== e.target.value),
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const requestRef = doc(db, 'CareTakers', cu_id);
            await updateDoc(requestRef, { weekdays: formData.weekdays, dayAvailability: formData.dayAvailability, availableTill: formData.availableTill });
            alert('Request updated successfully.');
            setUpdateModal(false);
            setFormData({
                weekdays: [],
                dayAvailability: [],
                availableTill: '',
            })
        } catch (error) {
            console.error('Error updating request:', error);
        }
    };

    function Show() {
        if (requests.confirm === 'no') {
            return (
                <>
                    <h4 class="animate-bounce h-6 w-2/4 font-serif text-lg text-black m-auto text-center mt-6">You have new request which is not confirmed..!</h4>
                    <div class="m-auto w-1/4 gap-4 mt-2">
                    <button  class="m-2 ml-6 bg-green-700 text-white hover:bg-green-300 hover:text-gray-800 font-semibold py-2 px-4 rounded-xl" onClick={() => handleConfirmRequest()}>Confirm</button>
                    <button  class="bg-blue-200 hover:bg-blue-400 text-gray-800 font-semibold py-2 px-4 rounded-xl" onClick={() => handleShowElderlyDetails(requests.eu_id)}>Show Elderly Details</button>
                    </div>
                </>)
        } else {
            return (
                <><h4 class=" animate-bounce h-6 w-2/4 font-serif text-lg text-black m-auto text-center mt-6">Request is already confirmed by you..! </h4>
                <div class="m-auto w-2/4 gap-4 mt-2 items-center justify-center flex">
                    <button  class="m-2   text-white bg-red-800 hover:bg-red-300 hover:text-gray-800 font-semibold py-2 px-4 rounded-xl" onClick={() => handleCancelConfirmation()}>Cancel Confirmation</button>
                    <button class="bg-blue-200 hover:bg-blue-400 text-gray-800 font-semibold py-2 px-4 rounded-xl" onClick={() => handleShowElderlyDetails(requests.eu_id)}>Show Elderly Details</button>
                    </div></>
            )
        }
    }

    return (
        <div>
            <h1 class="h-10 mt-4 font-bold text-center font-serif text-2xl m-auto w-1/3 text-blue-800">Requests For Care Taker</h1>

            {requests.booked === true ? (Show()) : 
            <div class="h-10 w-2/3 m-auto font-serif text-lg flex gap-10 justify-center mt-4"><div class="animate-bounce text-center p-2 text-lg">No Requests till now ..! </div><button class="text-center font-base bg-blue-400 text-white mx-4 mt-0 py-2 px-4 rounded-xl hover:bg-blue-800 hover:text-white" onClick={() => setUpdateModal(true)}>Update Your Information </button></div>}


            {/*update modal */}
            {updateModal && (<div className=" m-auto p-4 w-2/4 bg-blue-100 rounded-2xl mt-4">
                <h2 class="p-4 text-center text-2xl font-bold font-serif">Update Your Information</h2>
                <form class="p-4 text-4 text-blue-400 font-serif text-lg" onSubmit={handleUpdate}>
                    <label>Available Weekdays:</label>
                    <div class="grid grid-cols-6 gap-4 p-4 border-blue-700 border mt-2 rounded-2xl text-base">
                        <input type="checkbox" id="sunday" name="weekdays" value="sunday" onChange={handleCheckboxChange} />
                        <label htmlFor="sunday">Sunday</label>
                   
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
                    <button class="p-1 pl-3 pr-3 mt-3 rounded-lg bg-green-700 text-white font-serif hover:bg-green-300" type="submit">Update </button>
                    <br />
                    <button class="p-1 pl-3 pr-3 mt-3 rounded-lg bg-red-700 text-white font-serif hover:bg-red-300" onClick={() => setUpdateModal(false)} >Cancel </button>
                </form>
            </div>
            )}

            {/* Modal */}
            {showModal && (

                <div class="w-1/3 h-auto m-auto p-4 mt-4 font-serif text-lg border bg-cyan-100 rounded-xl ">
                    <h2 class="font-normal text-blue-400 text-center mb-4">Elderly User Details</h2>
                    {modalData && (
                        <div class="flex-col gap-4">
                            <div>Name: {modalData.name}</div>
                            <div>Age: {modalData.age}</div>
                            <div>Email: {modalData.email}</div>
                            <div>Address: {modalData.address}</div>
                            <div>Phone: {modalData.phone}</div>
                        </div>
                    )}
                    <button class="text-center font-semibold bg-blue-400 text-white my-4 py-2 px-4 rounded-xl hover:bg-blue-200 hover:text-black" onClick={closeModal}>Close</button>
                </div>
            )}
        </div>
    );
}
