// SignupPage.js
import React, { useState,useEffect } from 'react';
import SignupElderly from './components/SignUp/SignupElderly';
import SignupCareTaker from "./components/SignUp/SignupCareTaker";
import SignupStoreOwner from './components/SignUp/SignupStoreOwner';

const Signup = () => {
  const [signupOption, setSignupOption] = useState('');
  useEffect(()=>{
    setSignupOption('elderly')
  },[])

 function StoreOwner(){
  alert("Feature Coming Soon .....!")
 }

  return (
    <div>
      <div class="mt-10 m-auto w-2/4 h-20 p-6 flex gap-4 mb-10 border-blue-400 border-2 items-center justify-center rounded-xl" >
      <button class='pl-4 pr-4 p-2 border-blue-700 border-2 font-sans text-sm hover:bg-blue-100 hover:border-blue-100 rounded-xl' onClick={() => setSignupOption('elderly')}>Signup as Elderly User</button>
      <button class='pl-4 pr-4 p-2 border-blue-700 border-2 font-sans text-sm hover:bg-blue-100 hover:border-blue-100 rounded-xl' onClick={() => setSignupOption('caretaker')}>Signup as Care Taker</button>
      <button class='pl-4 pr-4 p-2 border-blue-700 border-2 font-sans text-sm hover:bg-blue-100 hover:border-blue-100 rounded-xl' onClick={() => StoreOwner() }>Signup as Store Owner</button>
      </div>
      {signupOption === 'elderly' && <SignupElderly />}
      {signupOption === 'caretaker' && <SignupCareTaker  />}
      {signupOption === 'storeowner' && <SignupStoreOwner />}
    </div>
  );
};

export default Signup;
