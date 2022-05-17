importScripts("https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js"
);
firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  projectId: "janz-learning",
  messagingSenderId: "402285027152",
  apiKey: "AIzaSyCxfExx43SiKGWC4jxjo--Jd-4hPWPbGvw",
  appId: "1:402285027152:web:8f66b46ebd11e4ab149655",
  //   authDomain: "janz-learning.firebaseapp.com",
  //   databaseURL: "https://janz-learning.firebaseio.com",
  //   storageBucket: "janz-learning.appspot.com",
  //   measurementId: "G-SVBSPTNG5Z",
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener("notificationclick", function (event) {
  // do what you want
  // ...
});
