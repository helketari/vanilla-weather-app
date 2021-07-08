let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = days[now.getDay()];
  let currentDate = now.getDate();
  let currentMonth = months[now.getMonth()];
  let currentYear = now.getFullYear();
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear} at ${currentHour}:${currentMinutes}`;
}

formatDate();

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  celsiusHigh = response.data.main.temp_max;
  celsiusLow = response.data.main.temp_min;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let highElement = document.querySelector(".current-high");
  highElement.innerHTML = Math.round(celsiusHigh);

  let lowElement = document.querySelector(".current-low");
  lowElement.innerHTML = Math.round(celsiusLow);

  let humidityElement = document.querySelector(".current-humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector(".current-wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

function search(city) {
  let apiKey = "14b04c33525e63089effa5297a33ce92";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "14b04c33525e63089effa5297a33ce92";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let gpsSearchButton = document.querySelector("#gps-search-form");
gpsSearchButton.addEventListener("click", showCurrentPosition);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let fahrenheitHigh = (celsiusHigh * 9) / 5 + 32;
  let highElement = document.querySelector(".current-high");
  highElement.innerHTML = Math.round(fahrenheitHigh);

  let fahrenheitLow = (celsiusLow * 9) / 5 + 32;
  let lowElement = document.querySelector(".current-low");
  lowElement.innerHTML = Math.round(fahrenheitLow);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let highElement = document.querySelector(".current-high");
  highElement.innerHTML = Math.round(celsiusHigh);

  let lowElement = document.querySelector(".current-low");
  lowElement.innerHTML = Math.round(celsiusLow);
}

let celsiusTemperature = null;
let celsiusHigh = null;
let celsiusLow = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("London");
