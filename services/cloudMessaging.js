import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();

export const getPermission = () =>
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      navigator.serviceWorker.ready.then((registration) =>
        getToken(messaging, {
          vapidKey:
            "BJ4OJY7Q6MfGkbXSX89IM2k2x6Uf54yJoMbOa5Eh9lLK4wYe0t5oTK0zIPs5gnRDgzWlQxI8wzXnT6Z2P-8u__g",
          serviceWorkerRegistration: registration,
        })
          .then((currentToken) => {
            if (currentToken) {
              document.getElementById("token").value = currentToken;
            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
              // ...
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          })
      );
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
