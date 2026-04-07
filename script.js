const apiKey = "ADD your api";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const forecastContainer = document.getElementById("forecast");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if(city !== ""){
        getWeather(city);
    }
});


function getWeather(city){

const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;


/* CURRENT WEATHER */

fetch(weatherURL)
.then(res => res.json())
.then(data => {

document.getElementById("cityName").innerText = data.name;

document.getElementById("temp").innerText =
`Temperature: ${data.main.temp}°C`;

document.getElementById("wind").innerText =
`Wind: ${data.wind.speed} M/S`;

document.getElementById("humidity").innerText =
`Humidity: ${data.main.humidity}%`;

document.getElementById("condition").innerText =
`Condition: ${data.weather[0].main}`;


/* ICON LOGIC */

const icon = document.getElementById("icon");

let condition = data.weather[0].main;
let iconCode = data.weather[0].icon;

if(condition === "Clear" && iconCode.includes("d")){
icon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";  // sun
}
else if(condition === "Clear" && iconCode.includes("n")){
icon.src = "https://cdn-icons-png.flaticon.com/512/1164/1164954.png"; // moon
}
else if(condition === "Clouds"){
icon.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png"; // cloud
}
else if(condition === "Rain"){
icon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png"; // rain
}
else{
icon.src =
`https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

});


/* FORECAST */

fetch(forecastURL)
.then(res => res.json())
.then(data => {

forecastContainer.innerHTML = "";

for(let i=4;i<data.list.length;i+=8){

let day = data.list[i];

let weatherCondition = day.weather[0].main;


/* ICON FOR FORECAST */

let iconUrl = "";

if(weatherCondition === "Clear"){
iconUrl = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
}
else if(weatherCondition === "Clouds"){
iconUrl = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
}
else if(weatherCondition === "Rain"){
iconUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
}
else if(weatherCondition === "Thunderstorm"){
iconUrl = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
}
else{
iconUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
}


let card = `
<div class="card">

<h3>${day.dt_txt.split(" ")[0]}</h3>

<img src="${iconUrl}">



<p>Temp: ${day.main.temp}°C</p>
<p>Wind: ${day.wind.speed} M/S</p>
<p>Humidity: ${day.main.humidity}%</p>

</div>
`;

forecastContainer.innerHTML += card;

}

});

}



/* WEATHER TICKER */

const tickerCities = [
"Delhi",
"Mumbai",
"Indore",
"Bhopal",
"Pune",
"Chennai",
"Hyderabad",
"Kolkata"
];

const ticker = document.getElementById("weatherTicker");

function loadTickerWeather(){

let items = [];

tickerCities.forEach(city=>{

fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
.then(res=>res.json())
.then(data=>{

if(!data.results) return;

const lat = data.results[0].latitude;
const lon = data.results[0].longitude;

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
.then(res=>res.json())
.then(weather=>{

const temp = weather.current_weather.temperature;

items.push(`${city} ${temp}°C`);

if(items.length === tickerCities.length){

let html = "";

items.forEach(city=>{
html += `<span>${city}</span>`;
});

/* duplicate once for smooth loop */
items.forEach(city=>{
html += `<span>${city}</span>`;
});

items.forEach(city=>{
html += `<span>${city}</span>`;
});

items.forEach(city=>{
html += `<span>${city}</span>`;
});

items.forEach(city=>{
html += `<span>${city}</span>`;
});

items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});
items.forEach(city=>{
html += `<span>${city}</span>`;
});

ticker.innerHTML = html;

}

});

});

});

}

loadTickerWeather();
