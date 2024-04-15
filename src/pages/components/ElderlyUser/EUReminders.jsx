import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase'; // 
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { messaging } from '../../../firebase/firebase';

const EUReminder = () => {
  let location = useLocation()
  const eu_id = location.state?.eu_id;
  console.log(eu_id);
  const [token, setToken] = useState();

  //every device will contain unique token with whose help we will send them the notification 
  async function requestForToken() {
    try {
      const currentToken = await getToken(messaging, { vapidKey: "BDgbtJg9HSRtCZB0wv0f-OlNzJgjTABWA4xBSNTNUIOHDvydFTg4uCLNKGlaFPWd30yeFBxjCqmDLg80PhwNtsU" });
      if (currentToken) {
        console.log(currentToken);
        setToken(currentToken);
        setNewReminder((prevValue) => ({
          ...prevValue,
          token: currentToken
        }));
        console.log({ "token": currentToken });

        // Return the currentToken to resolve the promise
        return currentToken;
      } else {
        console.log("No registration token available");
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }



  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    eu_id: eu_id,
    token: token,
    reminderName: '',
    medicineName: '',
    timeOfDay: '',
    timing: '',
  });

  useEffect(() => {
    const fetchReminders = async () => {
      const remindersRef = collection(db, 'Reminders');
      const querySnapshot = await getDocs(remindersRef);
      const fetchedReminders = [];
      if (querySnapshot.empty) {
        console.log("No reminders");
      } else {
        querySnapshot.forEach((doc) => {
          const reminderData = doc.data();
          if (reminderData.eu_id === eu_id) {
            fetchedReminders.push({
              id: doc.id,
              ...reminderData,
            });
          }
        });
      }

      setReminders(fetchedReminders);
    };

    fetchReminders();
  }, [eu_id]);

  const handleDeleteReminder = async (id, e) => {
    e.preventDefault(); // Ensure this line is correctly handled in the function call

    try {
      await deleteDoc(doc(db, 'Reminders', id));
      // Filter out the deleted reminder from the current reminders state
      const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
      setReminders(updatedReminders);
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };


  const handleAddReminder = async (e) => {
    e.preventDefault();

    // Wait for the token to be set before adding the reminder
    const currentToken = await requestForToken();
    if (currentToken) {
      const newReminderWithToken = { ...newReminder, token: currentToken };

      const docRef = await addDoc(collection(db, 'Reminders'), newReminderWithToken);
      console.log('Added new reminder:', newReminderWithToken);

      // Update the reminders state by fetching the updated list of reminders
      const updatedRemindersRef = collection(db, 'Reminders');
      const updatedQuerySnapshot = await getDocs(updatedRemindersRef);
      const updatedReminders = [];
      updatedQuerySnapshot.forEach((doc) => {
        const reminderData = doc.data();
        if (reminderData.eu_id === eu_id) {
          updatedReminders.push({
            id: doc.id,
            ...reminderData,
          });
        }
      });
      setReminders(updatedReminders);

      // Reset newReminder state and close modal after adding
      setNewReminder({
        reminderName: '',
        medicineName: '',
        timeOfDay: '',
        timing: '',
      });
      setShowModal(false);
    } else {
      console.log('Unable to add reminder due to missing registration token.');
    }
  };

  return (
    <div className="eureminder-container">
      <div class="h-10 w-2/3 m-auto font-serif text-lg flex gap-10 justify-center mt-4">
      <h1 class="text-center p-2">List of Reminders</h1>
      <button class="text-center font-base bg-blue-400 text-white mx-4 mt-0 py-2 px-4 rounded-xl hover:bg-blue-800 hover:text-white" onClick={() => setShowModal(true)}>Add New Reminder</button>
      </div>
      {showModal && (
        <div className="modal m-auto h-90 mt-12 p-10 w-2/4 z-10 bg-blue-200 rounded-3xl font-serif">
          <h2 class="m-auto text-center font-semibold text-cyan-800 text-xl">Add New Reminder</h2>
          <form class="m-4 mb-0" onSubmit={handleAddReminder}>
            <label htmlFor="reminderName">Reminder Name:</label>
            <input class="border-2 ml-3 h-6 m-1 text-sm "
              type="text"
              id="reminderName"
              name="reminderName"
              value={newReminder.reminderName}
              onChange={(e) => setNewReminder({ ...newReminder, reminderName: e.target.value })}
              required
            />
            <br />

            <label htmlFor="medicineName">Medicine Name:</label>
            <input class="border-2 ml-3 h-6 m-1 text-sm "
              type="text"
              id="medicineName"
              name="medicineName"
              value={newReminder.medicineName}
              onChange={(e) => setNewReminder({ ...newReminder, medicineName: e.target.value })}
              required
            />
            <br />

            <label htmlFor="timeOfDay">Time of Reminder:</label>
            <select class="border-2 ml-3 h-6 text-sm "
              id="timeOfDay"
              name="timeOfDay"
              value={newReminder.timeOfDay}
              onChange={(e) => setNewReminder({ ...newReminder, timeOfDay: e.target.value })}
              required
            >
              <option value="">Select Time of Day</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
            <br />

            <label htmlFor="timing">Timing:</label>
            <input class="border-2 ml-3 h-6 m-1 text-sm "
              type="text"
              id="timing"
              name="timing"
              value={newReminder.timing}
              onChange={(e) => setNewReminder({ ...newReminder, timing: e.target.value })}
              required
            />
            <br />

            <button class="text-center font-semibold bg-blue-400 text-white my-4 py-2 px-4 rounded-xl hover:bg-blue-800 hover:text-white" type="submit">Add Reminder</button>
          </form>

          <button class="text-center font-semibold bg-blue-400 text-white mx-4 mt-0 py-2 px-4 rounded-xl hover:bg-blue-800 hover:text-white" onClick={() => setShowModal(false)}>Discard Entry</button>
        </div>
      )}
      <div className="reminder-list w-2/4 m-auto mt-4 flex-col font-serif text-lg">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="reminder-item m-2 py-2 px-6 rounded-2xl bg-cyan-300">
            <h3>{reminder.reminderName}</h3>
            <p>Medicine: {reminder.medicineName}</p>
            <p>Time of Reminder: {reminder.timeOfDay}</p>
            <p>Timing: {reminder.timing}</p>
            <button  class="text-center font-sm bg-red-400 text-white py px-2 rounded-lg mt-2 hover:bg-red-800 hover:text-white" onClick={(e) => handleDeleteReminder(reminder.id, e)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EUReminder;
