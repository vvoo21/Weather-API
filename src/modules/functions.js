import { container } from './variables.js';

export const showError = (message) => {
  const alert = document.createElement('div');
  alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'relative', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
  container.appendChild(alert);

  const span = document.createElement('span');
  span.classList.add('block', 'sm:inline');
  span.textContent = message;
  alert.appendChild(span);
};

export const searchWeather = (e) => {
  e.preventDefault();

  const city = document.querySelector('#city').value;
  const country = document.querySelector('#country').value;

  if (city === '' || country === '') {
    showError('Both fields are required');
  }
};