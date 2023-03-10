import { container, result } from './variables.js';

export const showError = (message) => {
  const alertDiv = document.querySelector('.alert');
  if (!alertDiv) {
    const alert = document.createElement('div');
    alert.classList.add('alert', 'bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'relative', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
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

export const spinner = () => {

  cleanHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;

  result.appendChild(divSpinner);


} 

export const kelvinToCelsius = (temp) => {
  return parseInt(temp - 273.15);
}

export const cleanHTML = () => {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

export const showWeatherHTML = (data) => {
  const { name, main: { temp, temp_max, temp_min } } = data

  const celcius = kelvinToCelsius(temp);
  const max = kelvinToCelsius(temp_max);
  const min = kelvinToCelsius(temp_min);

  const resultDiv = document.createElement('div');
  resultDiv.classList.add('text-center', 'text-white');

  const nameCity = document.createElement('p');
  nameCity.innerHTML = `Weather in: ${name}`;
  nameCity.classList.add('font-bold', 'text-2xl');

  const actualTemp = document.createElement('p');
  actualTemp.textContent = `${celcius} °C`;
  actualTemp.classList.add('font-bold', 'text-6xl');

  const maxTemp = document.createElement('p');
  maxTemp.textContent = `Max: ${max} °C`;
  maxTemp.classList.add('text-xl');

  const minTemp = document.createElement('p');
  minTemp.textContent = `Min: ${min} °C`;
  minTemp.classList.add('text-xl');
  
  resultDiv.appendChild(nameCity);
  resultDiv.appendChild(actualTemp);
  resultDiv.appendChild(maxTemp);
  resultDiv.appendChild(minTemp);

  result.appendChild(resultDiv)

}

export const fetchAPI = (city, country) => {
  const idAPI = 'acb6df51d019cf23e3bc900846d7a07a';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${idAPI}`;

  spinner();

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cleanHTML();

      if (data.cod === '404') {
        showError('city not found');
        return
      }

      showWeatherHTML(data);
    })
    .catch((error) => error);
};

export const searchWeather = (e) => {
  e.preventDefault();

  const city = document.querySelector('#city').value;
  const country = document.querySelector('#country').value;

  if (city === '' || country === '') {
    showError('Both fields are required');

    return;
  }

  fetchAPI(city, country);
};