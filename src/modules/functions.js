import { container } from './variables.js';

export const showError = (message) => {
  const alertDiv = document.querySelector('.alert');
  if(!alertDiv) {
    const alert = document.createElement('div');
    alert.classList.add('alert','bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'relative', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
    container.appendChild(alert);

    const span = document.createElement('span');
    span.classList.add('block', 'sm:inline');
    span.textContent = message;
    alert.appendChild(span);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
};

export const fetchAPI = (city, country) => {
  const idAPI = 'acb6df51d019cf23e3bc900846d7a07a'; 

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${idAPI}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        showError('city not found');
      } else {
        showWeatherHTML(data);
      }
    })
    .catch(error => error);
}

export const searchWeather = (e) => {
  e.preventDefault();

  const city = document.querySelector('#city').value;
  const country = document.querySelector('#country').value;

  if (city === '' || country === '') {
    showError('Both fields are required');

    return
  }

  fetchAPI(city, country);
};