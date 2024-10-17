const apiKey = "ecbf44a70a020ad12ac4423e13bc647c";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather_icon = document.querySelector(".weather_icon");



async function checkWeather(city){
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        
    var data = await response.json();



    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h ";

    if(data.weather[0].main == "Clouds"){
        weather_icon.src = "Assets/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
        weather_icon.src = "Assets/clear.png"
    }
    else if(data.weather[0].main == "Rain"){
        weather_icon.src = "Assets/rain.png"
    }   
    else if(data.weather[0].main == "Drizzle"){
        weather_icon.src = "Assets/drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        weather_icon.src = "Assets/mist.png"
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


