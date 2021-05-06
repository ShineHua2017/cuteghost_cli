import "./style.css";
import 'alpinejs'
import 'charts.css'
import 'picnic'
 
//import { DateTime } from 'luxon';
//window.DateTime = DateTime;
import axios from 'axios';
window.axios = axios;
 
import envconfig from "./js/env";
window.envconfig = envconfig;
import changeFavicon from "./js/titleicon";
changeFavicon("./img/favicon.svg");
 
import { formdemo } from "./template/demoview";
document.querySelector("#app").innerHTML = formdemo;
 