// const { name } = require("pug/lib");

let app = document.querySelector(".weather-app");
let temp = document.querySelector(".temp");
let dateOutput = document.querySelector(".date");
let timeOutput = document.querySelector(".time");
let condition = document.querySelector(".condition");
let nameOutput = document.querySelector(".name");
let icon = document.querySelector(".icon");
let cloud = document.querySelector(".cloud");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let form = document.querySelector("#locationInput");
let search = document.querySelector(".search");
let btn = document.querySelector(".submit");
let cities = document.querySelectorAll(".city");

let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener("click", (e) => {
        cityInput = e.target.innerHTML;

        fetchWeatherData();

        app.style.opacity = "0";
    })
});

form.addEventListener("submit", (e) => {
    if (search.ariaValueMax.length == 0) {
        alert("Please type in a city name");
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    let weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekday[new Date(`${month}/${day}/${year}`).getDay()];
}

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=97dfb5204615462a90e214544222005&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {

            let code = data.current.condition.code;
            temp.innerHTML = data.current.temp_c + "&#176;";
            condition.innerHTML = data.current.condition.text;

            let date = data.location.localtime;
            let y = parseInt(date.substr(0, 4));
            let m = parseInt(date.substr(5, 2));
            let d = parseInt(date.substr(8, 2));
            let time = date.substr(11);
            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
            timeOutput.innerHTML = time;

            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = "icons/" + iconId;

            cloud.innerHTML = data.current.cloud + "%";
            humidity.innerHTML = data.current.humidity + "%";
            wind.innerHTML = data.current.wind_kph + "km/h";

            let timeOfDay = "day";
            
            // console.log(code);

            if (!data.current.is_day) {
                timeOfDay = "night";
            }
            if (code == 1000) {
                app.style.backgoundImage = `url(./imgs/${timeOfDay}/clear.jpg)`;
                btn.style.backgoundImage = "#e5ba92";
                if (timeOfDay == "night") {
                    btn.style.backgoundImage = "#181e27";
                }
            } else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgoundImage = `url("./imgs/${timeOfDay}/cloudy.jpg")`;
                btn.style.backgoundImage = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.backgoundImage = "#181e27";
                }
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgoundImageImage = `url("./imgs/${timeOfDay}/rainy.jpg")`;
                btn.style.backgoundImage = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.backgoundImage = "#325c80";
                }
            } else {
                app.style.backgoundImage = `url(./imgs/${timeOfDay}/cold.jpg)`;
                btn.style.backgoundImage = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.backgoundImage = "#1b1b1b";
                }
            }
            app.style.opacity = "1";
        })
        .catch(() => {
            alert("City not found, please try again");
            app.style.opacity = "1";
        });
}

fetchWeatherData();
app.style.opacity = "1";