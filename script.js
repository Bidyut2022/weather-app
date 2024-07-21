const APIkey = "201cb91a8c6bc0cfc06bbab85d542e91";

const searchBtn = document.getElementById("searchBtn");
const inputBox = document.querySelector(".input-box");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const descriptions = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location_error");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  console.log(weather_data);

  if (weather_data.cod === "404") {
    console.log("error");
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    return;
  }
  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  console.log(weather_data);
  temperature.innerHTML = `${weather_data.main.temp}${"°C"}`;
  descriptions.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}${" Km/H"}`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "images/cloud.png";
      break;
    case "Clear":
      weather_img.src = "images/clear.png";
      break;
    case "Rain":
      weather_img.src = "images/rain.png";
      break;
    case "Mist":
      weather_img.src = "images/mist.png";
      break;
    case "Snow":
      weather_img.src = "images/snow.png";
      break;
  }
}
searchBtn.addEventListener("click", async function () {
  const input = inputBox.value;
  checkWeather(input);
});
