import "./services/firebase";
import { getPermission } from "./services/cloudMessaging";
import { register } from "register-service-worker";

register(`./sw.js`);

document.getElementById("notify").addEventListener("click", getPermission);
