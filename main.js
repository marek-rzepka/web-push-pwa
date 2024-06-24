import "./services/firebase";
import { getPermission } from "./services/cloudMessaging";
import { register } from "register-service-worker";
import './services/webPushIOS';

register(`./sw.js`);

document.getElementById("notify").addEventListener("click", getPermission);
