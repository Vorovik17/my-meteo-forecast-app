function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElemen = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    console.log(response.data);

    
    cityElement.innerHTML = response.data.city;  
    descriptionElement.innerHTML = response.data.condition.description;
    timeElement.innerHTML = formatDate(date);
    humidityElemen.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}


function searchCity(city){
    let apiKey = "47901083fb7f68883d3o11dtfa1d6b74";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
    axios.get(apiUrl).then(refreshWeather);
}


function heandleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    console.log (searchInput.value);

    searchCity(searchInput.value);
}

function displayForecast(){
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  
  days.forEach(function(day){
    forecastHtml =
      forecastHtml +
        `
            <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">☀</div>
            <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                <strong>19°</strong>
                </div>
                <div class="weather-forecast-temperature">12°</div>
                </div>
            </div>
        `;
  });
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", heandleSearchSubmit)

searchCity("London");

displayForecast();



// let forecast = document.querySelector("#forecast");

// forecast.innerHTML = `
// <div class="weather-forecast">
//             <div class="weather-forecast-day">
//             <div class="weather-forecast-date">Tue</div>
//             <div class="weather-forecast-icon">☀</div>
//             <div class="weather-forecast-temperatures">
//                 <div class="weather-forecast-temperature"><strong>19°</strong></div>
//                 <div class="weather-forecast-temperature">12°</div>
//                 </div>
//             </div>
//             `;
