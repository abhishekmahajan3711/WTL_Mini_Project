// LoginPage.js
import React, { useEffect, useState } from 'react';
import LoginCareTaker from './components/Login/LoginCareTaker';
import LoginElderly from "./components/Login/LoginElderly";
import LoginStoreOwner from "./components/Login/LoginStoreOwner";

const Login = () => {
  const [loginOption, setLoginOption] = useState('');
  
  useEffect(()=>{
    setLoginOption('elderly')
  },[])

 function StoreOwner(){
  alert("Feature Coming Soon .....!")
 }
  return (
    <div>
     <div class="mt-10 m-auto w-2/4 h-20 p-6 flex gap-4 mb-10 border-blue-400 border-2 items-center justify-center rounded-xl">
      <button class='active:bg-blue-100 pl-4 pr-4 p-2 border-blue-700 border-2 font-sans text-sm hover:bg-blue-100 hover:border-blue-100 rounded-xl' onClick={() => setLoginOption('elderly')}>Login as Elderly User</button>
      <button class='pl-4 pr-4 p-2 border-blue-700 border-2 font-sans text-sm hover:bg-blue-100 hover:border-blue-100 rounded-xl'onClick={() => setLoginOption('caretaker')}>Login as Care Taker</button>
      <button class='pl-4 pr-4 p-2 border-blue-700 border-2 font-sans text-sm hover:bg-blue-100 hover:border-blue-100 rounded-xl' onClick={() => StoreOwner()}>Login as Store Owner</button>
      </div>
      {loginOption === 'elderly' && <LoginElderly  />}
      {loginOption === 'caretaker' && <LoginCareTaker  />}
      {loginOption === 'storeowner' && <LoginStoreOwner  />}
    </div>
  );
};

export default Login;
