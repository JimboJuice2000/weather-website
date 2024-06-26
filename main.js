const apiKey = "a2a745e82c144adf986717f9c3475bbb"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const body = document.querySelector("body");
const card = document.querySelector(".card");

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
    document.querySelector(".country").innerHTML= data.sys.country;

    const sunriseTime = convertTimestampToTime(data.sys.sunrise);
    document.querySelector("#sunrise").innerHTML=sunriseTime;
    
    const sunsetTime = convertTimestampToTime(data.sys.sunset);
    document.querySelector("#sunset").innerHTML=sunsetTime;

    const pressure = data.main.pressure;
    document.querySelector("#pressure").innerHTML = pressure + " hPa";
    
    card.style.backdropFilter="blur(15px)";

    if (data.weather[0].main=="Clouds") {
        weatherIcon.src = "images/clouds.svg";
        body.style.backgroundImage="url(images/clouds-bg.jpeg)";
    } 
    else if (data.weather[0].main=="Clear") {
        weatherIcon.src = "images/clear.svg";
        body.style.backgroundImage="url(images/clear-bg.jpeg)";
    } 
    else if (data.weather[0].main=="Rain") {
        weatherIcon.src = "images/rain.svg";
        body.style.backgroundImage="url(images/rain-bg.jpeg)";
    }
    else if (data.weather[0].main=="Drizzle") {
        weatherIcon.src = "images/drizzle.svg";
        body.style.backgroundImage="url(images/drizzle-bg.jpeg)";
    }
    else if (data.weather[0].main=="Mist") {
        weatherIcon.src = "images/mist.svg";
        body.style.backgroundImage="url(images/mist-bg.jpeg)";
    }
    else if (data.weather[0].main=="Haze") {
        weatherIcon.src = "images/mist.svg";
        body.style.backgroundImage="url(images/haze-bg.jpeg)";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

}

searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value);

});

// function convertTimestamp(timestamp) {
//     const date = new Date(timestamp * 1000); // Convert to milliseconds
//     return date.toUTCString();
// }

function convertTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds} UTC`;
}