import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase'; // Import your Firebase instance
import { collection, getDocs, query, where, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const EUCareTaker = () => {
    let location = useLocation();
    const eu_id = location.state?.eu_id;
    console.log(eu_id);


    const [availableCareTakers, setAvailableCareTakers] = useState([]);
    const [bookedCareTakers, setBookedCareTakers] = useState([]);
    const [showBookedCareTakers, setShowBookedCareTakers] = useState(false); // State to toggle between available and booked care takers

    useEffect(() => {
        const fetchCareTakers = async () => {
            try {
                const caretakersRef = collection(db, 'CareTakers');
                const availableQuery = query(caretakersRef, where('booked', '==', false));
                const bookedQuery = query(caretakersRef, where('booked', '==', true));

                const availableSnapshot = await getDocs(availableQuery);
                const availableCaretakersData = availableSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAvailableCareTakers(availableCaretakersData);

                const bookedSnapshot = await getDocs(bookedQuery);
                const bookedCaretakersData = bookedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBookedCareTakers(bookedCaretakersData);
            } catch (error) {
                console.error('Error fetching care takers:', error);
            }
        };

        fetchCareTakers();
    }, []);

    const handleBookCareTaker = async (caretakerId, CareTakername, CareTakerEmail) => {
        const confirmBooking = window.confirm(
            'Book Care Taker? If OK, an email will be sent to the CareTaker, and confirmation will be done within five working days.'
        );

        if (confirmBooking) {
            const userDocRef = doc(db, 'ElderlyUsers', eu_id);
            const userDocSnapshot = await getDoc(userDocRef);
            emailjs.init({publicKey: 'wzJAagTJYG24sKbku'})
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();

                //one copy will be sent to owner and one to Elderly person
               await emailjs.send("service_co5abhv", "template_vtl3eyj", {
                    CareTakername: CareTakername,
                    CareTakerEmail: CareTakerEmail,
                    ElderlyName: userData.name,
                    ElderlyEmail: userData.email,
                    ElderlyAge: userData.age,
                    ElderlyAddress: userData.address,
                    ElderlyPhone: userData.phone,
                }).then((res) => { alert("Email Sent. One copy sent to you !!!"); console.log("email send");console.log(res) }).catch(err => { console.log(err) });
            }

            try {
                const caretakerRef = doc(db, 'CareTakers', caretakerId);
                await updateDoc(caretakerRef, { booked: true, eu_id: eu_id });

                // Remove the booked care taker from available list and add it to booked list
                const updatedAvailableCareTakers = availableCareTakers.filter(caretaker => caretaker.id !== caretakerId);
                setAvailableCareTakers(updatedAvailableCareTakers);

                const bookedCaretaker = availableCareTakers.find(caretaker => caretaker.id === caretakerId);
                setBookedCareTakers(prevBookedCareTakers => [...prevBookedCareTakers, bookedCaretaker]);
            } catch (error) {
                console.error('Error booking care taker:', error);
            }
        }
    };

    const handleCancelBooking = async (caretakerId, CareTakername, CareTakerEmail) => {
        const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');

        if (confirmCancel) {

            const userDocRef = doc(db, 'ElderlyUsers', eu_id);
            const userDocSnapshot = await getDoc(userDocRef);
            emailjs.init({publicKey: 'wzJAagTJYG24sKbku'})
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                console.log(userData.email);

                //one copy will be sent to owner and one to Elderly person
               await emailjs.send("service_co5abhv","template_67uu5as", {
                    CareTakername: CareTakername,
                    CareTakerEmail: CareTakerEmail,
                    ElderlyName: userData.name,
                    ElderlyEmail: userData.email,
                    ElderlyAge: userData.age,
                    ElderlyAddress: userData.address,
                    ElderlyPhone: userData.phone,
                }).then((res) => { alert("Email Sent. One copy sent to you !!!"); console.log("email send");console.log(res) }).catch(err => { console.log(err) });
            }


            try {
                const caretakerRef = doc(db, 'CareTakers', caretakerId);
                await updateDoc(caretakerRef, { booked: false, eu_id: '' });

                // Remove the cancelled care taker from booked list and add it back to available list
                const updatedBookedCareTakers = bookedCareTakers.filter(caretaker => caretaker.id !== caretakerId);
                setBookedCareTakers(updatedBookedCareTakers);

                const cancelledCaretaker = bookedCareTakers.find(caretaker => caretaker.id === caretakerId);
                setAvailableCareTakers(prevAvailableCareTakers => [...prevAvailableCareTakers, cancelledCaretaker]);
            } catch (error) {
                console.error('Error cancelling booking:', error);
            }
        }
    };

    const handleShowBookedCareTakers = () => {
        setShowBookedCareTakers(true);
    };

    const handleShowAvailableCareTakers = () => {
        setShowBookedCareTakers(false);
    };

    return (
        <div className="care-takers-container">
            <div class="h-10 w-2/3 m-auto font-serif text-lg flex gap-10 justify-center mt-4">
            <h1 class="text-center p-2 animate-bounce">{showBookedCareTakers ? 'My Booked Care Takers' : 'Available Care Takers'}</h1>
            <button class=" text-center font-base bg-blue-400 text-white mx-4 mt-0 py-2 px-4 rounded-xl hover:bg-blue-800 hover:text-white" onClick={showBookedCareTakers ? handleShowAvailableCareTakers : handleShowBookedCareTakers}>
                {showBookedCareTakers ? 'Show Available Care Takers' : 'Show My Booked Care Takers'}
            </button>
            </div>
            <ul class="w-2/4 m-auto mt-4 flex-col font-serif text-lg">
                {showBookedCareTakers
                    ? bookedCareTakers.map(caretaker => (
                        <li class="m-2 py-2 px-6 rounded-2xl bg-cyan-300" key={caretaker.id}>
                            <div>Name: {caretaker.name}</div>
                            <div>Address: {caretaker.address}</div>
                            <div>Phone: {caretaker.phone}</div>
                            <div>Email: {caretaker.email}</div>
                            <div>Weekdays: {caretaker.weekdays.join(', ')}</div>
                            <div>Day Availability: {caretaker.dayAvailability.join(', ')}</div>
                            <div>Available Till: {caretaker.availableTill}</div>
                            <div class="text-white">Status: {caretaker.confirm === 'yes' ? 'Confirmed' : 'Not Confirmed'}</div>
                            <button class="text-center py-2 font-sm bg-red-600 text-white py px-4 rounded-lg mt-2 hover:bg-red-300 hover:text-white" onClick={() => handleCancelBooking(caretaker.id,caretaker.name, caretaker.email)}>Cancel Booking</button>
                        </li>
                    ))
                    : availableCareTakers.map(caretaker => (
                        <li class="m-2 py-2 px-6 rounded-2xl bg-cyan-300" key={caretaker.id}>
                            <div>Name: {caretaker.name}</div>
                            <div>Address: {caretaker.address}</div>
                            <div>Phone: {caretaker.phone}</div>
                            <div>Email: {caretaker.email}</div>
                            <div>Weekdays: {caretaker.weekdays.join(', ')}</div>
                            <div>Day Availability: {caretaker.dayAvailability.join(', ')}</div>
                            <div>Available Till: {caretaker.availableTill}</div>
                            <button class="text-center font-xs bg-green-600 text-white py-2 px-4 rounded-xl mt-2 hover:bg-green-300 hover:text-white" onClick={() => handleBookCareTaker(caretaker.id, caretaker.name, caretaker.email)}>Book</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default EUCareTaker;
