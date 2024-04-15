import React from 'react';
import { onMessageLsitener ,requestForToken} from '../firebase/firebase';
// import { onMessage } from 'firebase/messaging';
import Navbar from './Navbar';

export default function Home() {
    requestForToken();

    onMessageLsitener()
    .then((payload) => {
        alert(payload.notification.title + "\n" + payload.notification.body);
        console.log(payload);
    })
    .catch((err) => {
        console.log("no error.......");
        console.log(err);
    });
  return (
    <>
    <Navbar></Navbar>
    <div class="m-9 mb-0 p-4 text-center font-bold text-4xl text-blue-900">Helping Hands </div>
    <div class=" m-0 p-2 text-center text-2xl font-bold">Get help and make your life more easier and better with our Services !!!!</div>
   
      <img class="w-80 h-100 border-2 m-auto mt-10 border-black rounded-2xl" src={"./images/Home.png"}></img>
      <div className="absolute bottom-2 h-[400px] w-4/5 translate-x-[18%] rounded-full blur-[250px] bg-blue-800 -z-10"></div></>
  )
}
