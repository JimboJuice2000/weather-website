const apiKey = "a2a745e82c144adf986717f9c3475bbb"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl+city+`&appid=${apiKey}`);
    var data = await response.json();

    if (response.status = 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    } 

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp.toFixed(1) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main=="Clouds") {
        weatherIcon.src = "images/clouds.svg";
    } 
    else if (data.weather[0].main=="Clear") {
        weatherIcon.src = "images/clear.svg";
    } 
    else if (data.weather[0].main=="Rain") {
        weatherIcon.src = "images/rain.svg";
    }
    else if (data.weather[0].main=="Drizzle") {
        weatherIcon.src = "images/drizzle.svg";
    }
    else if (data.weather[0].main=="Mist") {
        weatherIcon.src = "images/mist.svg";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

}

searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value);

} )
