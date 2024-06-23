import "./services/firebase";
import { getPermission } from "./services/cloudMessaging";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}

document.getElementById("notify").addEventListener("click", getPermission);
