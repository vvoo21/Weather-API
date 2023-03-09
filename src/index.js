import './style.css';
import { form } from './modules/variables.js';
import { searchWeather } from './modules/functions.js';

window.addEventListener('load', () => {
  form.addEventListener('submit', searchWeather);
})