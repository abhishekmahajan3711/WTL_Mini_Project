import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EUHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const eu_id = location.state.id;
  console.log(eu_id);

  const handleAddReminders = () => {
    navigate("/EU/Reminder", { state: { eu_id: eu_id } });
  };

  const handleGetMedicineDelivery = () => {
    // navigate("/EU/MedicineDelivery", { state: { eu_id: eu_id } });
    alert('Feature coming soon.....!')
  };

  const handleGetCareTaker = () => {
    navigate("/EU/CareTaker", { state: { eu_id: eu_id } });
  };

  return (
    <>
      <div class="flex-col h-full w-3/4 m-auto mt-14 font-serif text-base bg-blue-50 rounded-2xl">
        <div class="flex h-40 p-8 gap-0">
          <div class="w-2/3">
          Enhance the daily lives of elderly users by enabling them to set reminders for medications and appointments. With push notifications, they can stay organized and on track with their health routines. The ability to effortlessly delete reminders adds a layer of flexibility, allowing for easy adjustment to changing schedules and needs.
          </div>
          <div class="w-1/3 flex justify-center items-center">
            <button class="py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-cyan-100 hover:text-black" onClick={handleAddReminders}>Add Reminders</button>
          </div>
        </div>
        <div class="flex h-40 p-8">
        <div class="w-1/3 flex justify-center items-center">
          <button class="py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-cyan-100 hover:text-black" onClick={handleGetMedicineDelivery}>
            Get Medicine Delivery
          </button>
          </div>
          <div class="w-2/3">
          Simplify the process of acquiring essential medications by offering a convenient platform for ordering and doorstep delivery. This service not only promotes health and well-being but also provides peace of mind, knowing that medications are readily accessible when needed.
          </div>
        </div>
        <div class="flex h-40 p-8">
          <div class="w-2/3">
          Empower elderly individuals by providing a seamless platform to book caregivers for personalized assistance. With the flexibility to cancel bookings if plans change, they can ensure reliable and tailored care that meets their specific needs and preferences.
          </div>
          <div class="w-1/3 flex justify-center items-center">
          <button class="py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-cyan-100 hover:text-black" onClick={handleGetCareTaker}>Get CareTaker</button>
          </div>
        </div>
      </div>
    </>
  );
}
