import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RequestsForCT from "./pages/components/CareTaker/RequestsForCT";
import EUHome from "./pages/components/ElderlyUser/EUHome";
import SOHome from "./pages/components/StoreOwner/SOHome";
import EUCareTaker from "./pages/components/ElderlyUser/EUCareTaker";
import EUMedicineDelivery from "./pages/components/ElderlyUser/EUMedicineDelivery";
import EUReminders from "./pages/components/ElderlyUser/EUReminders";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* all homes */}
          <Route path="/CT/Home" element={<RequestsForCT />} />
          <Route path="/EU/Home" element={<EUHome />} />
          <Route path="/SO/Home" element={<SOHome />} />

          {/* all realated to elderly users */}
          <Route path="/EU/Reminder" element={<EUReminders />} />
          <Route path="/EU/MedicineDelivery" element={<EUMedicineDelivery />} />
          <Route path="/EU/CareTaker" element={<EUCareTaker />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
