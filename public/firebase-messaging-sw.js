importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBnK2YjSICelpTt8q7MY2OpaFtvZbIKihQ",
    authDomain: "helping-hands-6f791.firebaseapp.com",
    projectId: "helping-hands-6f791",
    storageBucket: "helping-hands-6f791.appspot.com",
    messagingSenderId: "246792689752",
    appId: "1:246792689752:web:bbd1d497829c7483e3d22d",
    measurementId: "G-DZ230VNKLH"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log("Received background message", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload?.notification.body
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
