self.addEventListener("push", (event) => {
  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }
  console.log(event);
  const data = event.data?.json();
  const { notification } = data;
  console.log(notification);

  self.registration.showNotification(notification.title, {
    body: notification.body,
  });
});
